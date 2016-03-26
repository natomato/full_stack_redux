import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import Results from './components/Results';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';

const routes = <Route component={App}>
  <Route path='/results' component={Results} />
  <Route path='/' component={Voting} />
</Route>

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
);

//TODO: modify this to use browserHistory
