import React from 'react';
import { render } from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.min.css';

injectTapEventPlugin();

render(
    <App />, document.getElementById('root')
);
