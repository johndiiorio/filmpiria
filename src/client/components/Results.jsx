import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AppBar from './AppBar';
import UserCard from './UserCard';

const useStyles = makeStyles(theme => ({
	container: {
		marginLeft: theme.spacing(4),
		marginRight: theme.spacing(4),
	},
	cardContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
	},
}));

const Results = ({ results, history }) => {
	const classes = useStyles();
	if (!results) {
		history.push('/');
		return null;
	}
	const { name, topUsers } = results;
	return (
		<>
			<AppBar />
			<div className={classes.container}>
				<Typography variant="h6">Results for {name}:</Typography>
				<div className={classes.cardContainer}>
					{topUsers.length === 0 ? (
						<Typography variant="body1">No other users found</Typography>
					) : (
						<>
							{topUsers.map(user => (
								<UserCard key={user.name} {...user} />
							))}
						</>
					)}
				</div>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	results: state.results,
});
export default withRouter(connect(mapStateToProps)(Results));