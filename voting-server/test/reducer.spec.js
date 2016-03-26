import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('will create an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['batman']}
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['batman']
    }));
  });
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['cliff bars']};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      entries: ['cliff bars']
    }));
  });
  it('handels NEXT', () => {
    const initialState = fromJS({
      entries: ['cliff bars', 'skittles']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['cliff bars', 'skittles']
      },
      entries: []
    }));
  });
  it('handels VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['cliff bars', 'skittles']
      }
    });
    const action = {type: 'VOTE', entry: 'skittles'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['cliff bars', 'skittles'],
        tally: {skittles: 1}
      }
    }));
  });
  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Batman', 'Superman']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Batman'},
      {type: 'VOTE', entry: 'Superman'},
      {type: 'VOTE', entry: 'Batman'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Batman'
    }));
  });

});
