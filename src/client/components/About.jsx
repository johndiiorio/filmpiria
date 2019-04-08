import React from 'react';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	title: {
		marginBottom: 20,
	},
	text: {
		marginBottom: theme.spacing(2),
	}
}));

export default function About() {
	const classes = useStyles();
	return (
		<div>
			<Typography variant="h4" className={classes.title}>About</Typography>
			<Typography className={classes.text}>
				This site helps you find Letterboxd users with similar tastes in films.
				Please note that you will only get results for users who have already uploaded their ratings,
				so spread the word!
			</Typography>
			<Typography className={classes.text}>
				If you have already uploaded your ratings before, search for your username in the search
				bar above.
			</Typography>
		</div>
	)
}