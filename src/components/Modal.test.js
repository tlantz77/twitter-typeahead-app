import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

let wrapper, mockSetText, mockSetActiveMention;
beforeEach(() => {
  wrapper = shallow(<Modal/>);
  mockSetText = jest.fn();
  mockSetActiveMention = jest.fn();
});

describe('render', () => {
  it('should render without error', () => {
    expect(wrapper.find('.modal.wrapper').length).toEqual(1);
  });

  it('should render text input', () => {
    expect(wrapper.find('.modal.text-input').length).toEqual(1);
  });

  it('should render a toolbar', () => {
    expect(wrapper.find('.modal.toolbar').length).toEqual(1);
  });

  it('should render a submit button', () => {
    expect(wrapper.find('.util.submit-button').length).toEqual(1);
  });

  it('should not render search results if no active mention', () => {

    expect(wrapper.find('.search-results-wrapper').length).toEqual(0);
  });

  // it('should render search results if there is a currently active mention', () => {
  //   props = {
  //     text: 'Hi I am @ElBarto',
  //     activeMention: '@ElBarto'
  //   };
  //   expect(wrapper.find('.search-results-wrapper').length).toEqual(1);
  // });
});

