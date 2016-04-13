import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';
import Winner from './Winner';
import * as actionCreators from '../action_creators';

export class Results extends React.Component {
  constructor(props) {
    super(props);
    this.getPair = this.getPair.bind(this);
    this.getVotes = this.getVotes.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  getPair () {
    return this.props.pair || [];
  }
  getVotes (entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  }
  handleClick () {
    this.props.next();
  }
  render() {
    return (this.props.winner ?
      <Winner winner={this.props.winner} /> :
      <div className='results'>
        <div className='tally'>
        {this.getPair().map(entry =>
          <div key={entry} className='entry'>
            <h1>{entry}</h1>
            <div className='voteCount'>
              {this.getVotes(entry)}
            </div>
          </div>
        )}
        </div>
        <div className='management'>
          <button className='next' onClick={() => this.handleClick()}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
