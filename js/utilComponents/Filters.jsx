// @flow

import React from 'react';
import FilterCatProps from '../const';
import FilterButtonRow from './FilterButtonRow';

const Filters = (props: { filterCat: string, filters: {}, updateOptions: Function }) => {
  const passOptionState = (option: string, filter: string) => props.updateOptions(option, filter, props.filters);
  const getOptionsText = (filter: string, filterRowProps: FilterProp) => {
    if (Object.prototype.hasOwnProperty.call(filterRowProps, 'optionsText')) {
      if (Object.prototype.hasOwnProperty.call(filterRowProps.optionsText, filter)) {
        // $FlowFixMe - first check will guarantee that computed prop filterRowProps.optionsText will have prop [filter]
        return filterRowProps.optionsText[filter];
      }
    }
    return undefined;
  };
  const getBinaryBtnText = (filter: string, filterRowProps: FilterProp) => {
    if (Object.prototype.hasOwnProperty.call(filterRowProps, 'binaryFilterProps')) {
      if (Object.prototype.hasOwnProperty.call(filterRowProps.binaryFilterProps, filter)) {
        // $FlowFixMe - first check will guarantee that computed prop filterRowProps.optionsText will have prop [filter]
        return filterRowProps.binaryFilterProps[filter].btnText;
      }
    }
    return undefined;
  };
  const filterIsBinary = (filter: string, filterRowProps: FilterProp) => {
    if (Object.prototype.hasOwnProperty.call(filterRowProps, 'binaryFilters')) {
      // $FlowFixMe - previous test insures filterRowProps.binaryFilters !== undefined
      if (filterRowProps.binaryFilters.includes(filter)) {
        return true;
      }
    }
    return undefined;
  };

  const filterRowProps = FilterCatProps[props.filterCat];
  const filterGroup = (filterRow: any, filterTitle: string) => (
    <div className="mr4 flex justify-start">
      <button className="mr3 pl1 pr3 pv1 bg-transparent bt-0 br-0 bb bl-0 bw2 b--green fw6 f5 avenir tl pointer">
        {filterTitle}
      </button>
      {filterRow}
    </div>
  );
  const filterRow = (filter: string) => (
    <FilterButtonRow
      filter={filter}
      filterState={props.filters[filter]}
      filterOptions={filterRowProps.options[filter]}
      changeFilter={passOptionState}
      btnTextArr={getOptionsText(filter, filterRowProps)}
      includesBinaryBoth={filterIsBinary(filter, filterRowProps)}
      binaryBothBtnText={getBinaryBtnText(filter, filterRowProps)}
    />
  );
  const filters = filterRowProps.filters.map((filter: string, index) =>
    filterGroup(filterRow(filter), filterRowProps.titles[index])
  );

  return <div className="flex items-center">{filters}</div>;
};

export default Filters;
