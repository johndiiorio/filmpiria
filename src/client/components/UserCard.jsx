import React, { useState } from 'react';
import {
	Card,
	CardActions,
	CardContent,
	Typography,
	Button,
	Collapse,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 275,
	},
	actions: {
		display: 'flex',
	},
	launch: {
		marginLeft: 'auto',
	},
	collapseChildContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	filmText: {
		margin: theme.spacing(1),
		maxWidth: 'calc(100% - 30px)',
		wordWrap: 'break-word',
	},
}));

const UserCard = ({ name, displayScore = 100, films }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const onLaunchClick = () => {
		window.open(`http://letterboxd.com/${name}`, '_blank');
	};

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h4" color="textSecondary">
					{name}
				</Typography>
			</CardContent>
			<CardActions className={classes.actions}>
				<Tooltip title={`${name}'s top films you haven't rated`} enterDelay={500}>
					<Button
						size="small"
						onClick={() => setExpanded(!expanded)}
					>
						View Films
						{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</Button>
				</Tooltip>
				<Tooltip title="View profile" enterDelay={500}>
					<IconButton onClick={onLaunchClick} className={classes.launch}>
						<LaunchIcon />
					</IconButton>
				</Tooltip>
			</CardActions>
			<Collapse in={expanded}>
				<div className={classes.collapseChildContainer}>
					{films.map(film => (
						<Typography key={film.title} className={classes.filmText}>{film.title} ({film.year})</Typography>
					))}
				</div>
			</Collapse>
		</Card>

	);
}

export default UserCard;