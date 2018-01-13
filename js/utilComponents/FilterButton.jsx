// @flow

import React from 'react';

const FilterButton = (props: { val: string, text: string, updateFilterOption: Function }) => (
  <button className="bw0 bg-transparent avenir f6 pointer" value={props.val} onClick={props.updateFilterOption}>
    {props.text}
  </button>
);

export default FilterButton;
