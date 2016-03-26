import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Snickers', 'Doodles');
const tally = Map({'Snickers': 123, 'Doodles': 249});
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally
    });
  }
}
