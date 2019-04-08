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
		width: 275,
		margin: 25,
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
		maxWidth: 'calc(100% - 10px)',
		wordWrap: 'break-word',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
}));

const UserCard = ({ name, score, films }) => {
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
				{films.length > 0 && (
					<Tooltip title={`${name}'s top films you haven't rated`} enterDelay={500}>
						<Button
							size="small"
							onClick={() => setExpanded(!expanded)}
						>
							View Films
							{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						</Button>
					</Tooltip>
				)}
				<Tooltip title="View profile" enterDelay={500}>
					<IconButton onClick={onLaunchClick} className={classes.launch}>
						<LaunchIcon />
					</IconButton>
				</Tooltip>
			</CardActions>
			<Collapse in={expanded}>
				<CardContent className={classes.collapseChildContainer}>
					{films.map(film => (
						<a 
							key={film.title}
							href={film.url}
							target="_blank"
							rel="noopener noreferrer"
							className={classes.link}
						>
							<Typography
								className={classes.filmText}
								color="textSecondary"
							>
								{film.title} ({film.year})
							</Typography>
						</a>
					))}
				</CardContent>
			</Collapse>
		</Card>

	);
}

export default UserCard;