import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {
    it('adds entries to the state', () => {
      const state = Map();
      const entries = ['pop chips', 'kettle cooked'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('pop chips', 'kettle cooked')
      }));
    });
    it('converts to immutable', () => {
      const state = Map();
      const entries = ['pop chips', 'kettle cooked'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('pop chips', 'kettle cooked')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('pop chips', 'kettle cooked', 'lays')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('pop chips', 'kettle cooked')
        }),
        entries: List.of('lays')
      }));
    });
    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('pop chips', 'kettle cooked'),
          tally: Map({
            'kettle cooked': 10,
            'pop chips': 2
          })
        }),
        entries: List.of('lays', 'doritos', 'pringles')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('lays', 'doritos')
        }),
        entries: List.of('pringles', 'kettle cooked')
      }));
    });
    it('puts both back into entries when tied', () => {
      const state = Map({
        vote: Map({
          pair: List.of('pop chips', 'kettle cooked'),
          tally: Map({
            'kettle cooked': 10,
            'pop chips': 10
          })
        }),
        entries: List.of('lays', 'doritos', 'pringles')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('lays', 'doritos')
        }),
        entries: List.of('pringles', 'pop chips', 'kettle cooked')
      }));
      it('marks the winner when one entry left', () => {
        const state = Map({
          vote: Map({
            pair: List.of('pringles', 'doritos'),
            tally: Map({
              'pringles': 2,
              'doritos': 1
            })
          }),
          entries: List()
        });
        const nextState = next(state);
        expect(nextState).to.equal(Map({
          winner: 'pringles'
        }));
      });
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('pop chips', 'kettle cooked')
      });
      const nextState = vote(state, 'kettle cooked');
      expect(nextState).to.equal(Map({
        pair: List.of('pop chips', 'kettle cooked'),
        tally: Map({
          'kettle cooked': 1
        })
      }));
    });
    it('adds to the tally for the voted entry', () => {
      const state = Map({
        pair: List.of('pop chips', 'kettle cooked'),
        tally: Map({
          'kettle cooked': 1,
          'pop chips': 2
        })
      });
      const nextState = vote(state, 'kettle cooked');
      expect(nextState).to.equal(Map({
        pair: List.of('pop chips', 'kettle cooked'),
        tally: Map({
          'kettle cooked': 2,
          'pop chips': 2
        })
      }));
    });
  });
});
