import React from 'react';
import { AppBar, Toolbar, Typography, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FindForm from './FindForm';
import About from './About';

const useStyles = makeStyles(theme => ({
	appBar: {
		marginBottom: '2em',
	},
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

export default function App() {
	const classes = useStyles();
	return (
		<>
			<AppBar className={classes.appBar} position="sticky">
				<Toolbar>
          			<Typography variant="h5" color="textPrimary">
						Find Letterboxd Users  
					</Typography>
        		</Toolbar>
			</AppBar>
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
		</>
	);
}