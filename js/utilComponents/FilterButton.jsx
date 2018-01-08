// @flow

import React from 'react';

const FilterButton = (props: { val: string, text: string, updateFilter: Function }) => (
  <button className="bw0 bg-transparent avenir f6 pointer" value={props.val} onClick={props.updateFilter}>
    {props.text}
  </button>
);

export default FilterButton;
