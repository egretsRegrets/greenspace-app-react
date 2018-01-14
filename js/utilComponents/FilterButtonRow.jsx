// @flow

import React from 'react';
import FilterButton from './FilterButton';

const FilterButtonRow = (props: {
  filter: string,
  filterState: {},
  filterOptions: Array<string>,
  changeFilter: Function,
  btnTextArr?: Array<string>,
  includesBinaryBoth?: boolean,
  binaryBothBtnText?: string
}) => {
  // pass filterValue and target filter up to parent
  const passFilterValue = event => props.changeFilter(event.target.value, props.filter);
  const filterStateVals = Object.keys(props.filterState).map((filterKey: string) => props.filterState[filterKey]);
  const binaryBothBtn = (
    <FilterButton
      filterSelected={!filterStateVals.includes(false)}
      key="binaryBoth"
      val="binaryBoth"
      text={props.binaryBothBtnText ? props.binaryBothBtnText : 'Either'}
      updateFilterOption={passFilterValue}
    />
  );
  return (
    <nav className="flex justify-start">
      {props.includesBinaryBoth ? binaryBothBtn : null}
      {props.filterOptions.map((filter: string, index) => (
        <FilterButton
          filterSelected={props.filterState[filter]}
          key={filter}
          val={filter}
          // $FlowFixMe - possibly undefined value sufficiently covered by defaultProps
          text={props.btnTextArr.length >= index ? props.btnTextArr[index] : filter}
          updateFilterOption={passFilterValue}
        />
      ))}
    </nav>
  );
};

FilterButtonRow.defaultProps = { btnTextArr: [], includesBinaryBoth: false, binaryBothBtnText: 'Either' };

export default FilterButtonRow;
