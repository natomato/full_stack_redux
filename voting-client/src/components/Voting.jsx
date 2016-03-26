import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Vote from './Vote.jsx';
import Winner from './Winner.jsx';

// This class is acting like a router
export default class Voting extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    return (
      <div>
        {this.props.winner ?
          <Winner winner={this.props.winner} /> :
          <Vote {...this.props} />}
      </div>
    );
  }
}
