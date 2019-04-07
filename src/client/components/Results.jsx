import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Results = ({ results, history }) => {
	if (!results.length) {
		history.push('/');
	}
	return (
		<div>Results</div>
	);
}

const mapStateToProps = state => ({
	results: state.results,
});
export default withRouter(connect(mapStateToProps)(Results));