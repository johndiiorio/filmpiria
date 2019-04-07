import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	appBar: {
		marginBottom: '2em',
	},
	titleText: {
		cursor: 'pointer',
	},
}));

const AppBar = ({ history }) => {
	const classes = useStyles();

	return (
		<MuiAppBar className={classes.appBar} position="sticky">
			<Toolbar>
				<Typography
					variant="h5"
					color="textPrimary"
					onClick={() => history.push('/')}
					className={classes.titleText}
				>
					Find Letterboxd Users  
				</Typography>
			</Toolbar>
		</MuiAppBar>
	);
}

export default withRouter(AppBar);