import React, { Component } from 'react';
import { render } from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import HomePage from './containers/App';

class App extends Component {
  render() {
    return (
    	<MuiThemeProvider>
	    	<HomePage />
	 	</MuiThemeProvider>
    );
  }
}

export default App;
