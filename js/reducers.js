// @flow

import { combineReducers } from 'redux';
import SET_TEST_PHRASE from './actions';

const testPhrase = (state = '', action: Action) => {
  if (action.type === SET_TEST_PHRASE) {
    return action.payload;
  }
  return state;
};

const user = (state = { id: '5a3074b72b40d9857018bf07' }, action: Action) => {
  if (action) {
    return state;
  }
  return state;
};

const rootReducer = combineReducers({ testPhrase, user });

export default rootReducer;
