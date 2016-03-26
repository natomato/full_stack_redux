import {expect} from 'chai';
import {List} from 'immutable';

describe('immutability', () => {

  describe('A list', () => {
    function addCandy(currentState, candy) {
      return currentState.push(candy);
    }

    it('is immutable', () => {
      let state = List.of('yorkshire peppermints', 'pillow mints');
      let nextState = addCandy(state, 'mentos');

      expect(nextState).to.equal(List.of(
        'yorkshire peppermints', 'pillow mints', 'mentos'
      ));

      expect(state).to.equal(List.of(
        'yorkshire peppermints', 'pillow mints'
      ));
    });
  });
});