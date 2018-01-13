// @flow

import React from 'react';
import FilterButton from './FilterButton';

const FilterButtonRow = (props: {
  filter: string,
  filterOptions: Array<string>,
  changeFilter: Function,
  btnTextArr?: Array<string>,
  includesBinaryBoth?: boolean,
  binaryBothBtnText?: string
}) => {
  // pass filterValue and target filter up to parent
  const passFilterValue = event => props.changeFilter(event.target.value, props.filter);
  const binaryBothBtn = (
    <FilterButton
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
