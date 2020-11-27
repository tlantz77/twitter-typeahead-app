import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

let component, props;
let getShallow = () => {
  if (component) return component;
  component = shallow(<Modal {...props}/>);
  return component;
};

describe('render', () => {
  beforeEach(() => {
    component = null;
    props = {};
  });

  it('should render without error', () => {
    expect(getShallow().find('.modal.wrapper').length).toEqual(1);
  });

  it('should render text input', () => {
    expect(getShallow().find('.modal.text-input').length).toEqual(1);
  });

  it('should render a toolbar', () => {
    expect(getShallow().find('.modal.toolbar').length).toEqual(1);
  });

  it('should render a submit button', () => {
    expect(getShallow().find('.util.submit-button').length).toEqual(1);
  });
});