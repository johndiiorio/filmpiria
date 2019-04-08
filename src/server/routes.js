const express = require('express');
const { validate } = require('jsonschema');
const { find, sum, orderBy } = require('lodash');
const db = require('./models/db');
const router = express.Router();

router.post('/upload', async (req, res, next) => {
	try {
		const validReq = {
			type: 'object',
			maxProperties: 2,
			required: ['name', 'ratings'],
			properties: {
				name: { type: 'string' },
				ratings: { type: 'array' },
			}
		};
		if (!validate(req.body, validReq).valid) {
			res.status(400).send('Invalid request');
			return;
		}
		let { name: rawName, ratings: rawRatings } = req.body;
		const name = rawName.toLowerCase();
		const ratings = rawRatings.filter(r => {
			if (typeof r.rating !== 'number') {
				return false;
			}
			if (typeof r.year !== 'string' || r.length === 0) {
				return false;
			}
			if (typeof r.url !== 'string' || r.length === 0) {
				return false;
			}
			if (typeof r.title !== 'string' || r.length === 0) {
				return false;
			}
			return true;
		});
		if (!name.length) {
			res.status(400).send('Invalid request');
			return;
		}
		if (ratings.length < 50) {
			res.status(400).send('You must have rated at least 50 films');
			return;
		}
		
		const topUsers = await calculate(name, ratings);
		await db.run(
			'INSERT OR REPLACE INTO users (name, ratings) VALUES (?, ?)',
			[name, JSON.stringify(ratings)]
		);
		res.send({
			name,
			topUsers
		});
	} catch (err) {
		next(err);
	}
});

router.post('/find', async (req, res, next) => {
	try {
		const validReq = {
			type: 'object',
			maxProperties: 1,
			required: ['name'],
			properties: {
				name: { type: 'string' },
			}
		};
		if (!validate(req.body, validReq).valid) {
			res.status(400).send('Invalid request');
			return;
		}
		let { name: rawName } = req.body;
		const name = rawName.toLowerCase();
		const user = await db.get('SELECT ratings FROM users WHERE name = ?', name);
		if (!user) {
			res.status(400).send('No user found');
			return;
		}
		
		const topUsers = await calculate(name, JSON.parse(user.ratings));
		res.send({
			name,
			topUsers
		});
	} catch (err) {
		next(err);
	}
});

const calculate = async (cName, cRatings) => {
	const allUsers = await db.all('SELECT name, ratings FROM users');
	let userScores = [];
	allUsers.forEach(({ name: uName, ratings: uRatings }) => {
		if (uName === cName) {
			return;
		}
		uRatings = JSON.parse(uRatings);
		let matchedRatings = [];
		let unMatchedRatings = [];
		uRatings.forEach(uRating => {
			const matchedRating = find(
				cRatings,
				cRating => cRating.title === uRating.title && cRating.year === uRating.year
			);
			if (!matchedRating) {
				unMatchedRatings.push({
					...uRating,
					url: `https://letterboxd.com/film/${uRating.url}`,
				});
				return;
			}
			const difference = Math.abs(matchedRating.rating - uRating.rating);
			matchedRatings.push(difference);
		});
		// Current user and comparison user must have rated at least 15 of the same films
		if (matchedRatings.length > 15) {
			// Show only the top 10 films
			const highestRatedFilmsUnwatched = orderBy(unMatchedRatings, 'rating', 'desc').slice(0, 10);
			userScores.push({
				score: sum(matchedRatings) / matchedRatings.length,
				name: uName,
				films: highestRatedFilmsUnwatched,
			});
		}
	});
	const topUsers = orderBy(userScores, 'score', 'asc').slice(0, 30);
	return topUsers;
};

module.exports = router;
