import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';
import Toolbar from './Toolbar';
import TypeaheadDropdown from './TypeaheadDropdown';

let component, mockSetText, mockSetMentionToSearch;
beforeEach(() => {
  component = shallow(<Modal/>);
  mockSetText = jest.fn();
  mockSetMentionToSearch = jest.fn();
});

describe('render', () => {
  it('should render without error', () => {
    expect(component.find('.modal.wrapper').length).toEqual(1);
  });

  it('should render text input', () => {
    expect(component.find('.modal.text-input').length).toEqual(1);
  });

  it('should render a Toolbar', () => {
    expect(component.find(Toolbar).length).toEqual(1);
  });

  it('should not render TypeaheadDropdown if no searchable mention', () => {
    expect(component.find(TypeaheadDropdown).length).toEqual(0);
  });
});

