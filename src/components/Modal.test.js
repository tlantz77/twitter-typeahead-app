import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

let component, props;
let getShallow = () => {
  if (component) return component;
  component = shallow(<Modal {...props}/>);
  return component;
};

beforeEach(() => {
  component = null;
  props = { 
    tweetText: '',
    activeMention: ''
  };
});

describe('render', () => {
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

  it('should not render search results if no active mention', () => {
    expect(getShallow().find('.search-results-wrapper').length).toEqual(0);
  });

  it('should render search results if there is a currently active mention', () => {
    props = {
      tweetText: 'Hi I am @ElBarto',
      activeMention: '@ElBarto'
    };
    expect(getShallow().find('.search-results-wrapper').length).toEqual(1);
  });
});

describe('state', () => {
  it('should instantiate with no text', () => {
    let instance = getShallow().instance();
    expect(instance.state.tweetText).toEqual('');   
  });

  it('should instantiate with no active mention', () => {
    let instance = getShallow().instance();
    expect(instance.state.activeMention).toEqual('');   
  });
});
