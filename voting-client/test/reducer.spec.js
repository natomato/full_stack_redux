import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Snickers', 'Doodles'),
          tally: Map({'Doodles': 1})
        })
      })
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: List.of('Snickers', 'Doodles'),
        tally: Map({'Doodles': 1})
      }
    }));
  });
  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Snickers', 'Doodles'],
          tally: {'Doodles': 1}
        }
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Doodles': 1}
      }
    }));
  });
  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Snickers', 'Doodles'],
          tally: {'Doodles': 1}
        }
      }
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Doodles': 1}
      }
    }));
  });
  it('handles SET_STATE removes hasVoted if the pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Doodles': 1}
      },
      hasVoted: 'Doodles'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Potato chips', 'Potatos']
        }
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Potato chips', 'Potatos']
      }
    }));
  });
  it('handles SET_STATE keeps hasVoted if the pair stays', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Doodles': 1}
      },
      hasVoted: 'Doodles'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Snickers', 'Doodles'],
          tally: {'Snickers': 1, 'Doodles': 1}
        }
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Snickers': 1, 'Doodles': 1}
      },
      hasVoted: 'Doodles'
    }));
  });
  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Doodles': 1}
      }
    });
    const action = { type: 'VOTE', entry: 'Doodles'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Doodles': 1} //NOTE: server's responsibility to update
      },
      hasVoted: 'Doodles'
    }));
  });
  it('handles VOTE by NOT setting hasVoted for invalid entries', () => {
    const state = fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Doodles': 1}
      }
    });
    const action = { type: 'VOTE', entry: 'Ice Cream'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Snickers', 'Doodles'],
        tally: {'Doodles': 1}
      }
    }));
  });
});
