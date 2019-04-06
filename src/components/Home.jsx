import React from 'react';
import { Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FindForm from './FindForm';
import About from './About';

const useStyles = makeStyles(theme => ({
	container: {
		[theme.breakpoints.down('sm')]: {
			marginLeft: '2em',
			marginRight: '2em',
		},
		[theme.breakpoints.up('md')]: {
			marginLeft: '6em',
			marginRight: '6em',
		},
		marginBottom: 50,
	}
}));

export default function Home() {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<FindForm />
				</Grid>
				<Grid item xs={12} md={6}>
					<About />
				</Grid>
			</Grid>
		</div>
	);
}