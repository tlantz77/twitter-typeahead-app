import React from 'react';
import { shallow } from 'enzyme';
import Compose from './Compose';
import Toolbar from './Toolbar';
import TypeaheadDropdown from './TypeaheadDropdown';

let component;

let getShallow = () => {
  if (component) return component;
  component = shallow(<Compose />);
  return component;
}

beforeEach(() => {
  component = null;
});

describe('render', () => {
  it('should render without error', () => {
    expect(getShallow().find('.compose.wrapper').length).toEqual(1);
  });

  it('should render text input', () => {
    expect(getShallow().find('.compose.text-input').length).toEqual(1);
  });

  it('should render a Toolbar and pass textLength prop', () => {
    let toolbar = getShallow().find(Toolbar);
    expect(toolbar.length).toEqual(1);
    expect(toolbar.prop('textLength')).toEqual(0);
  });

  it('should not render TypeaheadDropdown if no searchable mention', () => {
    expect(getShallow().find(TypeaheadDropdown).length).toEqual(0);
  });
});

//Need more tests (need to read up on testing hooks)!!!



