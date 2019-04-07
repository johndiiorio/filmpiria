import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Fade, CircularProgress } from '@material-ui/core';
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
	submitContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	button: {
		margin: theme.spacing(1),
	},
	progress: {
		margin: theme.spacing(2),
	},
	input: {
		display: 'none',
	}
}));

const FindForm = ({ dispatch, history, fetching, submitError }) => {
	const classes = useStyles();
	const [name, updateName] = useState('');
	const [ratings, updateRatings] = useState([]);
	const [uploadErrorText, updateUploadErrorText] = useState('');

	const disabled = !name || !ratings.length || fetching;

	const onFileUpload = async e => {
		const file = e.target.files[0];
		let error = '';
		if (file.name !== 'ratings.csv') {
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
			updateUploadErrorText(error);
			setTimeout(() => {
				updateUploadErrorText('')
			}, 3000);
		}
	}

	const onFindClick = async () => {
		dispatch(find({ name, ratings }, history));
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
					<Fade in={!!uploadErrorText}>
						<Typography className={classes.errorText}>{uploadErrorText}</Typography>
					</Fade>
				</div>
			</div>
			<div className={classes.row}>
				<Typography variant="h6">3. Find similar users.</Typography>
				<div className={classes.submitContainer}>
					<Button
						color="primary"
						variant="contained"
						className={classes.button}
						disabled={disabled}
						onClick={onFindClick}>
						Find
					</Button>
					{fetching && <CircularProgress className={classes.progress} />}
					<Fade in={!!submitError}>
						<Typography className={classes.errorText}>{submitError}</Typography>
					</Fade>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	fetching: state.fetching,
	submitError: state.error,
})

export default withRouter(connect(mapStateToProps)(FindForm));