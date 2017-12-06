// @flow

import React from 'react';
import { connect } from 'react-redux';
import setTestPhrase from './actionCreators';

const Landing = (props: { testPhrase: string, setTestPhrase: Function }) => (
  <div>
    <h1>{props.testPhrase}</h1>
    <input type="text" placeholder="enter redux test phrase" onChange={props.setTestPhrase} value={props.testPhrase} />
  </div>
);
const mapStateToProps = state => ({ testPhrase: state.testPhrase });
const mapDispatchToProps = (dispatch: Function) => ({
  setTestPhrase(event) {
    dispatch(setTestPhrase(event.target.value));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
