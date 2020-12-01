import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Compose from './Compose';

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it('should render without error', () => {
    const component = wrapper.find('.App');
    expect(component.length).toBe(1);
  });

  it('should render a Compose component', () => {
    const component = wrapper.find(Compose);
    expect(component.length).toBe(1);
  });
});