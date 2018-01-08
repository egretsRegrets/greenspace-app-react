// @flow

import { combineReducers } from 'redux';
import initialState from './initialState';
import SET_GREENSPACES_FILTERS from './actions';

const user = (state = { id: '5a3074b72b40d9857018bf07' }, action: Action) => {
  if (action) {
    return state;
  }
  return state;
};

const greenspacesFilters = (state = initialState.greenspacesFilters, action: Action) => {
  if (action.type === SET_GREENSPACES_FILTERS) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

const rootReducer = combineReducers({ user, greenspacesFilters });

export default rootReducer;
