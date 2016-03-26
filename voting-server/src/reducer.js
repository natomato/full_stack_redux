import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      //reducer knows where to find the state in the state tree and asks
      //the correct function to fill that node
      return state.update('vote', voteState => vote(voteState, action.entry));
    }
  return state;
}
