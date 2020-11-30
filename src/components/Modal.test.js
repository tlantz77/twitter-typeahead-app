import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';
import Toolbar from './Toolbar';
import TypeaheadDropdown from './TypeaheadDropdown';

let component, mockSetText, mockSetActiveMention;
beforeEach(() => {
  component = shallow(<Modal/>);
  mockSetText = jest.fn();
  mockSetActiveMention = jest.fn();
});

describe('render', () => {
  it('should render without error', () => {
    expect(component.find('.modal.wrapper').length).toEqual(1);
  });

  it('should render text input', () => {
    expect(component.find('.modal.text-input').length).toEqual(1);
  });

  it('should render a toolbar', () => {
    expect(component.find(Toolbar).length).toEqual(1);
  });

  it('should not render Suggestions if no active mention', () => {
    expect(component.find(TypeaheadDropdown).length).toEqual(0);
  });

  // it('should render search results if there is a currently active mention', () => {
  //   props = {
  //     text: 'Hi I am @ElBarto',
  //     activeMention: '@ElBarto'
  //   };
  //   expect(component.find('.search-results-component').length).toEqual(1);
  // });
});

