import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.getPair = this.getPair.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.hasVotedFor = this.hasVotedFor.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  getPair() {
    return this.props.pair || [];
  }
  isDisabled() {
    return !!this.props.hasVoted;
  }
  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }
  clickHandler(entry) {
    //TODO: implement vote for real, not just in test
    this.props.vote(entry);
  }
  render() {
    return (
      <div className='voting'>
        <p className='test'></p>
        {this.getPair().map(entry =>
          <button key={entry}
                  onClick={() => this.clickHandler(entry)}
                  disabled={this.isDisabled()}>
            <h1>{entry}</h1>
            {
              (() => {
                //IIFE for funzees, the ternary op is more common here.
                if(this.hasVotedFor(entry)) {
                  return <div className='label'>Voted</div>
                }
              })()
            }
          </button>
        )}
      </div>
    );
  }
}
