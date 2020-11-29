import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Modal from './Modal';

describe.only('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it('should render without error', () => {
    const component = wrapper.find('.App');
    expect(component.length).toBe(1);
  });

  it('should render a Modal component', () => {
    const component = wrapper.find(Modal);
    expect(component.length).toBe(1);
  });
});