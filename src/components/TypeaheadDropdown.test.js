import React from 'react';
import { shallow } from 'enzyme';
import TypeaheadDropdown from './TypeaheadDropdown';

const mockResults = [
  {
    id: 1, name: 'HomerSimpson', screenName: '@Homey', verified: true
  },
  {
    id: 2, name: 'BartSimpson', screenName: '@ElBarto', verified: false
  },
  {
    id: 3, name: 'BarneyGumble', screenName: '@BGDawg', verified: true
  }
];

let component, props;

let getShallow = () => {
  if (component) return component;
  component = shallow(<TypeaheadDropdown {...props}/>);
  return component;
}

beforeEach(() => {
  component = null;
  props = { searchResults: mockResults };
});

describe('render dropdown', () => {
  it('should render a dropdown', () => {
    expect(getShallow().find('.dropdown-wrapper').length).toEqual(1);
  });

  it('should render a user row for each search result', () => {
    expect(getShallow().find('.user-row').length).toEqual(3);
  });
});


describe('render user row', () => {
  let userRow;
  beforeEach(() => {
    userRow = getShallow().find('.user-row').at(0);
  });

  it('should render a user icon', () => {
    expect(userRow.find('.user-icon').length).toEqual(1);
  });

  it('should render a user name with check if verified', () => {
    expect(userRow.find('.user-name').text()).toEqual('HomerSimpson *');
  });

  it('should render a user handle', () => {
    expect(userRow.find('.user-screen-name').text()).toEqual('@Homey');
  });

  it('should render a user name with check if verified', () => {
    userRow = getShallow().find('.user-row').at(1);
    expect(userRow.find('.user-name').text()).toEqual('BartSimpson');
  });
});