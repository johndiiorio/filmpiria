const express = require('express');
const { validate } = require('jsonschema');
const { find, sum, orderBy } = require('lodash');
const db = require('../models/db');
const router = express.Router();

router.post('/', async (req, res, next) => {
	try {
		const validReq = {
			type: 'object',
			maxProperties: 2,
			required: ['name', 'ratings'],
			properties: {
				username: { type: 'string' },
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
			if (typeof r.title !== 'string' || r.length === 0) {
				return false;
			}
			return true;
		});
		if (!name.length || ratings.length !== rawRatings.length) {
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
		res.send(topUsers);
	} catch (err) {
		next(err);
	}
});


const calculate = async (cName, cRatings) => {
	const allUsers = await db.all('SELECT name, ratings FROM users');
	let userScores = [];
	allUsers.forEach(({ name: uName, ratings: uRatings }) => {
		if (!uName === cName || uRatings.length < 15) {
			return;
		}
		uRatings = JSON.parse(uRatings);
		let matchedRatings = [];
		cRatings.forEach(cRating => {
			const matchedRating = find(
				uRatings,
				uRating => uRating.title === cRating.title && uRating.year === cRating.year
			);
			if (!matchedRating) {
				return;
			}
			const difference = Math.abs(matchedRating.rating - cRating.rating);
			matchedRatings.push(difference);
		});
		userScores.push({
			score: sum(matchedRatings) / matchedRatings.length,
			name: uName,
		});
	});
	const topUsers = orderBy(userScores, 'score', 'asc').slice(0, 10).map(u => u.name);
	return topUsers;
};

module.exports = router;
