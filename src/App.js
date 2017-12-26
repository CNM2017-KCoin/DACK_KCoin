import React, { Component } from 'react';
import { render } from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Game from './Game';

class App extends Component {
  render() {
    return (
    	<MuiThemeProvider>
	    	<MyAwesomeReactComponent />
	 	</MuiThemeProvider>
    );
  }
}

export default App;
