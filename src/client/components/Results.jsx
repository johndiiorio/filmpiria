import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from './AppBar';
import UserCard from './UserCard';

const Results = ({ results, history }) => {
	// if (!results.length) {
	// 	history.push('/');
	// 	return null;
	// }
	const films = [
		{ title: 'Movie Title', year: '1964'},
		{ title: 'Movie Title', year: '1964'},
		{ title: 'Movie Title', year: '1964'},
		{ title: 'Movie Title', year: '1964'},
	]
	return (
		<>
			<AppBar />
			<UserCard name="user" films={films} />
		</>
	);
}

const mapStateToProps = state => ({
	results: state.results,
});
export default withRouter(connect(mapStateToProps)(Results));