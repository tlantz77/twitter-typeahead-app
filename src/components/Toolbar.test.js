import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from './Toolbar';

let component, props;

let getShallow = () => {
  if (component) return component;
  component = shallow(<Toolbar {...props}/>);
  return component;
}

beforeEach(() => {
  component = null;
  props = { textLength: 0 };
});

describe('render', () => {
  it('should render a toolbar', () => {
    expect(getShallow().find('.toolbar').length).toEqual(1);
  });

  it('should render a text length counter', () => {
    expect(getShallow().find('.text-counter').length).toEqual(1);
  });

  it('should render a submit button', () => {
    expect(getShallow().find('.submit-button').length).toEqual(1);
  });
});

describe('text length counter', () => {
  it('should display a max remaining characters when textLength 0', () => {
    expect(getShallow().find('.text-counter').text()).toEqual('280');
  });

  it('should display text counter in white if characters left', () => {
    props = { textLength: 140 };
    let textCounter = getShallow().find('.text-counter');
    expect(textCounter.text()).toEqual('140');
    expect(textCounter.prop('style').color).toEqual('white');
  });

  it('should display text counter in red if no characters left', () => {
    props = { textLength: 280 };
    let textCounter = getShallow().find('.text-counter');
    expect(textCounter.text()).toEqual('0');
    expect(textCounter.prop('style').color).toEqual('red');
  });
});