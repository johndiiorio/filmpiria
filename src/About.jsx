import React from 'react';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	title: {
		marginBottom: 20,
	},
}));

export default function About() {
	const classes = useStyles();
	return (
		<div>
			<Typography variant="h4" className={classes.title}>About</Typography>
			<Typography>
				This site helps you find Letterboxd users with similar tastes in movies.
				Please note that you will only get results for users who have already uploaded their ratings,
				so spread the word!
			</Typography>
		</div>
	)
}