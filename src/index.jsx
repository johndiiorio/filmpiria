import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import theme from './client/theme';
import App from './client/components/App';
import reducers from './client/redux/reducers';
import saga from './client/redux/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(saga);

const AppWithProviders = () => {
	return (
		<ThemeProvider theme={theme}>
			<ReduxProvider store={store}>
				<CssBaseline />
				<App />
			</ReduxProvider>
		</ThemeProvider>
	);
};

ReactDOM.render(<AppWithProviders />, document.getElementById('root'));