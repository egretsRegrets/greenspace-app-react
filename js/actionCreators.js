// @flow

import SET_TEST_PHRASE from './actions';

function setTestPhrase(testPhrase: string) {
  return { type: SET_TEST_PHRASE, payload: testPhrase };
}

export default setTestPhrase;
