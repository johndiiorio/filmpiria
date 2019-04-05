import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import App from './App';

const AppWithProviders = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	);
};

ReactDOM.render(<AppWithProviders />, document.getElementById('root'));
