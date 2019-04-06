import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Results from './Results';

const useStyles = makeStyles(theme => ({
	appBar: {
		marginBottom: '2em',
	},
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
			<Router>
				<Route exact path="/" component={Home} />
				<Route exact path="/results" component={Results} />
			</Router>
		</>
	);
}