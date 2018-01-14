// @flow

import React from 'react';

const FilterButton = (props: { filterSelected: boolean, val: string, text: string, updateFilterOption: Function }) => (
  <button
    className={`${props.filterSelected ? 'selectedFilter' : 'deSelectedFilter'} bw0 bg-transparent avenir f6 pointer`}
    value={props.val}
    onClick={props.updateFilterOption}
  >
    {props.text}
  </button>
);

export default FilterButton;
