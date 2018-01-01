import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
// import {Provider} from 'react-redux';
// import logger from 'redux-logger';
// import rootReducer from './reducers/index.js';
import Routes from './routes';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// const store = createStore(rootReducer,applyMiddleware(logger));
class App extends Component {
  render() {
    return (
		// <Provider store={store}>
		<Router routes={Routes} history={browserHistory} />
		// </Provider>
    );
  }
}

export default App;
