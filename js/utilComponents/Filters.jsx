// @flow

import React from 'react';
import FilterCatProps from '../const';
import FilterButtonRow from './FilterButtonRow';
import { optionalComputedPropVal } from '../utils';

const Filters = (props: { filterCat: string, filters: {}, updateOptions: Function }) => {
  const passOptionState = (option: string, filter: string) => props.updateOptions(option, filter, props.filters);
  const filterIsBinary = (filter: string, filterRowProps: FilterProp) => {
    if (
      optionalComputedPropVal(filterRowProps, ['binaryFilters']) &&
      // $FlowFixMe - first check negates possibility of reaching this line if optionalComputedPropVal(filterRowProps, ['binaryFilters']) returns null
      optionalComputedPropVal(filterRowProps, ['binaryFilters']).includes(filter)
    ) {
      return true;
    }
    return undefined;
  };

  const filterRowProps = FilterCatProps[props.filterCat];
  const filterGroup = (filterRow: any, filterTitle: string) => (
    <div key={filterTitle} className="mr4 flex justify-start">
      <button className="mr3 pl1 pr3 pv1 bg-transparent bt-0 br-0 bb bl-0 bw2 b--green fw6 f5 avenir tl pointer">
        {filterTitle}
      </button>
      {filterRow}
    </div>
  );
  const filterRow = (filter: string) => (
    <FilterButtonRow
      key={filter}
      filter={filter}
      filterState={props.filters[filter]}
      filterOptions={filterRowProps.options[filter]}
      changeFilter={passOptionState}
      // $FlowFixMe - flow doesn't like optionalComputedVal because it can return type any
      btnTextArr={optionalComputedPropVal(filterRowProps, ['optionsText', filter], true)}
      includesBinaryBoth={filterIsBinary(filter, filterRowProps)}
      // $FlowFixMe - flow doesn't like optionalComputedVal because it can return type any
      binaryBothBtnText={optionalComputedPropVal(filterRowProps, ['binaryFilterProps', filter, 'btnText'], true)}
    />
  );
  const filters = filterRowProps.filters.map((filter: string, index) =>
    filterGroup(filterRow(filter), filterRowProps.titles[index])
  );

  return (
    <div className="pt4 pb0">
      <div className="ph5">
        <button
          className="bt-0 br-0 bb-0 bl-0 bg-transparent pointer flex justify-start items-center"
          style={{ paddingLeft: '0' }}
        >
          <h3 className="mr2 f3 fw6 bw0 avenir near-black">Filters</h3>
          <svg className="w1 near-black" data-icon="chevronDown" viewBox="0 0 32 32" style={{ fill: 'currentcolor' }}>
            <title>chevronDown icon</title>
            <path d="M1 18 L5 14 L16 24 L27 14 L31 18 L16 32 Z" />
          </svg>
        </button>
        <div className="flex items-center">{filters}</div>
      </div>
    </div>
  );
};

export default Filters;
