// @flow

import SET_GREENSPACES_FILTERS from './actions';

function setGreenspacesFilters(greenspacesFilters: greenspacesFilters) {
  return { type: SET_GREENSPACES_FILTERS, payload: greenspacesFilters };
}

export default setGreenspacesFilters;
