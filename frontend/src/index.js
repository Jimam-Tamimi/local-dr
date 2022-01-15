import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App'; 
import {Provider} from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>

    <App  />
        </Switch>
      </Router>
    </Provider>,
  document.getElementById('root')
);

