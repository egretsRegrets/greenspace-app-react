// @flow

import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Filters from '../utilComponents/Filters';
import initialState from '../initialState';

configure({ adapter: new Adapter() });

const gsFiltersPropsHandOff = (option: string, filter: string, filters: {}) => console.log(option, filter, filters);
const shallowGsFilters = render(
  <Filters filterCat="greenspaces" filters={initialState.filters.greenspaces} updateOptions={gsFiltersPropsHandOff} />
);

describe('gsFilters-suite', () => {
  it('Should contain 11 buttons', () => {
    expect(shallowGsFilters.find('button').length).toBe(11);
  });
});
