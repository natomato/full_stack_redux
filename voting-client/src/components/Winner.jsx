import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Winner extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    return (<div className='winner'>Winner is {this.props.winner}!</div>);
  }
}
