import React from 'react';
import { shallow } from 'enzyme';
import TypeaheadDropdown from './TypeaheadDropdown';

const mockResults = [
  {
    id: 1, name: 'HomerSimpson', screenName: '@Homey', verified: true, profileImgUrl: 'mockUrl'
  },
  {
    id: 2, name: 'BartSimpson', screenName: '@ElBarto', verified: false, profileImgUrl: 'mockUrl'
  },
  {
    id: 3, name: 'BarneyGumble', screenName: '@BGDawg', verified: true, profileImgUrl: 'mockUrl'
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
  props = { items: mockResults };
});

describe('render dropdown', () => {
  it('should render a dropdown', () => {
    expect(getShallow().find('.dropdown-wrapper').length).toEqual(1);
  });

  it('should render an item row for each search result', () => {
    expect(getShallow().find('.item-row').length).toEqual(3);
  });
});


describe('render item row', () => {
  let itemRow;
  beforeEach(() => {
    itemRow = getShallow().find('.item-row').at(0);
  });

  it('should render a item icon', () => {
    expect(itemRow.find('.item-icon').length).toEqual(1);
  });

  it('should render a item name with check if verified', () => {
    expect(itemRow.find('.item-name').text()).toContain('HomerSimpson');
    expect(itemRow.find('.verified').length).toEqual(1);
  });

  it('should render a item handle', () => {
    expect(itemRow.find('.item-screen-name').text()).toEqual('@Homey');
  });

  it('should render a item name without check if not verified', () => {
    itemRow = getShallow().find('.item-row').at(1);
    expect(itemRow.find('.item-name').text()).toContain('BartSimpson');
    expect(itemRow.find('.verified').length).toEqual(0);
  });
});