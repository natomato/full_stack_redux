import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import Winner from '../../src/components/Winner';


function setup (props = {}) {
  props.pair = List.of('apples', 'oranges');
  props.tally = props.tally || Map({});
  return shallow(<Results {...props}/>);
}

describe('Results', () => {
  it('renders the vote count', () => {
    const props = {tally: Map({'apples': 11, 'oranges': 3})};
    const entries = setup(props).find('.entry');
    expect(entries.length).to.equal(2);
    expect(entries.first().text()).to.have.string('apples');
    expect(entries.first().find('.voteCount').text()).to.equal('11');
    expect(entries.last().text()).to.have.string('oranges');
    expect(entries.last().find('.voteCount').text()).to.equal('3');
  });
  it('renders 0 votes if tally entry is missing', () => {
    const apples = setup().find('.entry').first();
    expect(apples.text()).to.have.string('apples');
    expect(apples.find('.voteCount').text()).to.equal('0');
  });
  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const props = {next: () => nextInvoked = true};
    const component = setup(props);
    expect(nextInvoked).to.equal(false);
    component.find('button.next').simulate('click');
    expect(nextInvoked).to.equal(true);
  });
  it('renders the winner when the voting is closed', () => {
    const props = {winner: 'apples'};
    const component = setup(props);
    expect(component.find(Winner)).to.be.present();
    expect(component.find('.results').length).to.equal(0);
  });
});
