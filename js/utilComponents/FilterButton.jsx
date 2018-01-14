// @flow

import React from 'react';

const FilterButton = (props: { filterSelected: boolean, val: string, text: string, updateFilterOption: Function }) => {
  const selectedFilterArray = ['b--near-black', 'bb', 'bw2', 'bt-0', 'br-0', 'bl-0'];
  return (
    <button
      className={`${
        props.filterSelected === true ? selectedFilterArray.join(' ') : 'deSelectedFilter'
      } mr2 bw0 bg-transparent avenir f6 pointer`}
      value={props.val}
      onClick={props.updateFilterOption}
    >
      {props.text}
    </button>
  );
};

export default FilterButton;
