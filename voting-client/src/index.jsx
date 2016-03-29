import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import App from './components/App';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Snickers', 'Doodles'],
      tally: {Snickers: 2}
    }
  }
});

const routes = <Route component={App}>
  <Route path='/results' component={ResultsContainer} />
  <Route path='/' component={VotingContainer} />
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

//TODO: modify this to use browserHistory
