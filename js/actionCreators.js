// @flow

import { SET_GREENSPACES_FILTERS, SET_FARMERS_FILTERS } from './actions';

export const setGreenspacesFilters = (greenspacesFilters: greenspacesFilters) => ({
  type: SET_GREENSPACES_FILTERS,
  payload: greenspacesFilters
});

export const setFarmersFilters = (farmersFilters: genFilters) => ({
  type: SET_FARMERS_FILTERS,
  payload: farmersFilters
});
