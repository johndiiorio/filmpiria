import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
				<Switch>
					<Route exact path="/results" component={Results} />
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		</>
	);
}