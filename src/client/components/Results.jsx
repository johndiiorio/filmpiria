import React from 'react';
import { connect } from 'react-redux';

const Results = ({ results, fetching }) => {
	return (
		<div>{fetching ? 'fetching' : 'not fetching'}</div>
	);
}

const mapStateToProps = state => ({
	fetching: state.fetching,
	results: state.results,
});
export default connect(mapStateToProps)(Results);