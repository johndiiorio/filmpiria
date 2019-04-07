import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Fade } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Help from './Help';
import { find } from '../redux/actions';
import { parseRatingsFile } from '../utils';

const useStyles = makeStyles(theme => ({
	container: {
		marginBottom: '5em',
	},
	row: {
		marginBottom: theme.spacing(2),
	},
	textWithHelp: {
		display: 'flex',
		alignItems: 'center',
	},
	helpContainer: {
		padding: theme.spacing(2),
	},
	uploadRatingsContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	ratingsFound: {
		marginLeft: 10,
	},
	errorText: {
		color: '#f84949',
		marginLeft: 10,
	},
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	}
}));

const FindForm = ({ dispatch, history }) => {
	const classes = useStyles();
	const [name, updateName] = useState('');
	const [ratings, updateRatings] = useState([]);
	const [errorText, updateErrorText] = useState('');

	const disabled = !name || !ratings.length;

	const onFileUpload = async e => {
		const file = e.target.files[0];
		let error = '';
		if (file.name !== 'ratings.csv'){
			error = 'Please select the ratings.csv file';
		} else {
			const parsedRatings = await parseRatingsFile(file);
			if (!parsedRatings.length) {
				error = 'There was an error loading the ratings file';
			} else {
				updateRatings(parsedRatings);
			}
		}
		if (error) {
			updateErrorText(error);
			setTimeout(() => {
				updateErrorText('')
			}, 3000);
		}
	}

	const onFindClick = async () => {
		dispatch(find({ name, ratings }));
		history.push('/results');
	};

	return (
		<div className={classes.container}>
			<div className={classes.row}>
				<Typography variant="h6">1. Enter your Letterboxd username.</Typography>
				<TextField
					label="Username"
					margin="normal"
					variant="outlined"
					value={name}
					onChange={e => updateName(e.target.value)}
				/>
			</div>
			<div className={classes.row}>
				<div className={classes.textWithHelp}>
					<Typography variant="h6">2. Upload your Letterboxd ratings.</Typography>
					<Help>
						<div className={classes.helpContainer}>
							<Typography>
								1. Download your data on Letterboxd: Profile > Settings > Import & Export > Export Your Data
							</Typography>
							<Typography>2. Extract the zip file</Typography>
							<Typography>3. Upload ratings.csv</Typography>
						</div>
					</Help>
				</div>
				<div className={classes.uploadRatingsContainer}>
					<input
						accept=".csv"
						className={classes.input}
						onChange={onFileUpload}
						id="contained-button-file"
						type="file"
					/>
					<label htmlFor="contained-button-file">
						<Button color="secondary" variant="contained" component="span" className={classes.button}>
							Upload
						</Button>
					</label>
					{ratings.length > 0 && (
						<Typography className={classes.ratingsFound}>{ratings.length} ratings found</Typography>
					)}
					<Fade in={!!errorText}>
						<Typography className={classes.errorText}>{errorText}</Typography>
					</Fade>
				</div>
			</div>
			<div className={classes.row}>
				<Typography variant="h6">3. Find similar users.</Typography>
				<Button color="primary" variant="contained" className={classes.button} disabled={disabled} onClick={onFindClick}>
					Find
				</Button>
			</div>
		</div>
	)
}

export default withRouter(connect()(FindForm));