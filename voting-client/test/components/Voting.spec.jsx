import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import {Voting} from '../../src/components/Voting';
import {List} from 'immutable';
import { mount, render, shallow } from 'enzyme';

function noop () {};
function setup (props = {}) {
  props.pair = ['apples', 'oranges'];
  props.vote = props.vote || noop;
  return mount(<Voting {...props}/>);
}

//NOTE: these tests take > 50 seconds
describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const componentButtons = setup().find('button');
    expect(componentButtons.length).to.equal(2);
    expect(componentButtons.first().text()).to.equal('apples');
    expect(componentButtons.last().text()).to.equal('oranges');
  });
  it('invokes callback when a button is clicked', () => {
    let votedWith;
    let props = {vote: (entry) => votedWith = entry};
    const applesButton = setup(props).find('button').first();
    expect(applesButton.text()).to.equal('apples');
    applesButton.simulate('click');
    expect(votedWith).to.equal('apples');
  });
  it('disables buttons after user votes', () => {
    let props = {hasVoted: 'oranges'};
    const component = setup(props);
    expect(component.find('button[disabled]').length).to.equal(2);
  });
  it('adds a label to the voted entry', () => {
    let props = {hasVoted: 'oranges'};
    const component = setup(props);
    expect(component.last('button').text()).to.contain('Voted');
  });
  it('renders only the winner when given a winner', () => {
    let props = {winner: 'oranges'};
    const message = setup(props).text();
    expect(message).to.contain('Winner is oranges');
    expect(message).not.to.contain('apples');
  });
});
describe('uses shallowCompare to speed up rendering on pure components', () => {
  it('renders as a pure component', () => {
    let props = {pairs: List.of('apples', 'oranges')};
    let wrapper = mount(<Voting {...props} />);
    expect(wrapper.props().pairs).to.eql(List.of('apples', 'oranges'));
    props.pairs.set(0, 'bananas');
    wrapper.update();
    expect(wrapper.props().pairs).to.equal(List.of('apples', 'oranges'));
  });
});
