import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Results from './Results';

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/results" component={Results} />
				<Route path="/" component={Home} />
			</Switch>
		</Router>
	);
}