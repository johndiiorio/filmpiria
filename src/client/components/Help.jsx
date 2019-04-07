import React from 'react';
import { Popover, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export default function Help(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : null;

	return (
		<>
			<IconButton aria-describedby={id} onClick={handleClick}>
				<HelpIcon />
	  		</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				{props.children}
			</Popover>
		</>
	);
}
