// @flow

import { combineReducers } from 'redux';
import SET_TEST_PHRASE from './actions';

const testPhrase = (state = '', action: Action) => {
  if (action.type === SET_TEST_PHRASE) {
    return action.payload;
  }
  return state;
};

const rootReducer = combineReducers({ testPhrase });

export default rootReducer;
