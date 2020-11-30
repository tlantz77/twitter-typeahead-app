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
  it('should display a text length number from textLength prop', () => {
    expect(getShallow().find('.text-counter').text()).toEqual('0');
  });

  it('should display text counter in white if below character limit', () => {
    props = { textLength: 279 };
    let textCounter = getShallow().find('.text-counter');
    expect(textCounter.text()).toEqual('279');
    expect(textCounter.prop('style').color).toEqual('white');
  });

  it('should display text counter in white if below character limit', () => {
    props = { textLength: 281 };
    let textCounter = getShallow().find('.text-counter');
    expect(textCounter.text()).toEqual('281');
    expect(textCounter.prop('style').color).toEqual('red');
  });
});