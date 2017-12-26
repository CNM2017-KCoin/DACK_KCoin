import React, { Component } from 'react';

import { Router, browserHistory } from 'react-router';
import Routes from './routes';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
  		<Router routes={Routes} history={browserHistory} />
    );
  }
}

export default App;
