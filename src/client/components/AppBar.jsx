import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar, Typography, InputBase, Snackbar, SnackbarContent } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ErrorIcon from '@material-ui/icons/Error';
import { withRouter } from 'react-router-dom';
import { find } from '../redux/actions';

const useStyles = makeStyles(theme => ({
	appBar: {
		marginBottom: '2em',
	},
	titleText: {
		cursor: 'pointer',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 'auto',
		width: 'auto',
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200,
			},
		},
	},
	snackbarContent: {
		backgroundColor: theme.palette.error.dark,
	},
	errorIcon: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
		fontSize: 20,
	},
	errorMessage: {
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.text.secondary,
	},
}));

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const AppBar = ({ dispatch, history, findError }) => {
	const classes = useStyles();
	const [searchValue, updateSearchValue] = useState('');
	const [snackbarOpen, updateSnackbarOpen] = useState(false);
	const previousFindError = usePrevious(findError);

	useEffect(() => {
		if (findError && findError !== previousFindError && previousFindError !== undefined) {
			updateSnackbarOpen(true);
		}
	}, [dispatch, findError, previousFindError]);

	const onSearchInputKeyPress = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			dispatch(
				find({ name: searchValue }, history)
			);
			updateSearchValue('');
		}
	};

	return (
		<>
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
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search..."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							value={searchValue}
							onChange={e => updateSearchValue(e.target.value.trim())}
							onKeyPress={onSearchInputKeyPress}
						/>
					</div>
				</Toolbar>
			</MuiAppBar>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={() => updateSnackbarOpen(false)}
			>
				<SnackbarContent
					className={classes.snackbarContent}
					message={
						<span className={classes.errorMessage}>
							<ErrorIcon className={classes.errorIcon} />
							{findError}
						</span>
					}
				/>
			</Snackbar>
		</>
	);
}

const mapStateToProps = state => ({
	findError: state.findError,
});

export default withRouter(connect(mapStateToProps)(AppBar));