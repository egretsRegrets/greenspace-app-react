// @flow

// easings, more here as needed
export const cubicOut = (time: number) => {
  let t = time;
  t -= 1;
  return t * t * t + 1;
};

// easings grouping
export const easings = { cubicOut };

// to dom element scrolling
export const scrollToElem = (
  targetElem: HTMLElement | null = null,
  duration: number = 300,
  easingFunction: Function = (time: number) => time,
  verticalCompensation: number = 0,
  event: SyntheticEvent<*> | null = null
) => {
  if (targetElem !== null) {
    if (event !== null) {
      event.preventDefault();
    }
    const startPosition = window.pageYOffset;
    const startTime = new Date().getTime();
    // $FlowFixMe
    const documentHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const destinationOffset = targetElem.offsetTop + verticalCompensation;
    let destinationScroll;
    if (documentHeight - destinationOffset < windowHeight) {
      destinationScroll = documentHeight - windowHeight;
    } else {
      destinationScroll = destinationOffset;
    }

    // if we don't have access to requestAnimationFrame then we just scroll
    if ('requestAnimationFrame' in window === false) {
      return window.scrollTo(0, targetElem.offsetTop);
    }
    const scroll = () => {
      const now = new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      window.scroll(0, Math.ceil(easingFunction(time) * (destinationScroll - startPosition) + startPosition));

      if (window.pageYOffset === destinationScroll) {
        return;
      }

      requestAnimationFrame(scroll);
    };

    return scroll();
  }
  return null;
};

// takes a per-page slice of paginated content
export const paginationSlice = (items: Array<Object>, pageNumber: number, cardsPerPage: number) =>
  items.slice(pageNumber * cardsPerPage - (cardsPerPage - 1) - 1, pageNumber * cardsPerPage);

/**
 * => initialState obj for filters
 * @param {Object with any num props of any name of type Array<string> } filters - filter objects, keys are the filter name,
 *  vals are array of strings that translate to filter options
 * Each prop of filters becomes a prop of returned initialState obj
 * Each val in filters.<prop> becomes a prop of initialState.<prop>,
 *  all initialState.<prop> child props are given val true
 */
export const initializeFilterState = (filters: {}): {} => {
  const initialState = {};
  Object.keys(filters).forEach(key => {
    const filterOptions = {};
    filters[key].forEach(innerKey => {
      filterOptions[innerKey] = true;
    });
    initialState[key] = filterOptions;
  });
  return initialState;
};

const isFilterBinary = (filterState: {}) => Object.keys(filterState).length === 2;

/*
function filterFromOption (option: string, filterState: {}): string | null {
  let filter: string | null = null;
  Object.keys(filterState).forEach(key => {
    if (Object.keys(filterState[key]).includes(option)) {
      filter = key;
    }
  });
  return filter;
};
*/

const turnFiltersOff = (filters: { [filter: string]: string } | { yes: boolean, no: boolean }) => {
  const updatedFilters = {};
  Object.keys(filters).forEach(key => {
    // only add/set prop if prop is not already true
    if (!filters[key]) {
      updatedFilters[key] = true;
    }
  });
  return Object.assign({}, filters, updatedFilters);
};

// for updating a filter with two options, one of which, if true, sets the other to false:
const updateBinaryFilter = (
  filter: 'yes' | 'no' | 'binaryBoth',
  filtersState: { yes: boolean, no: boolean }
): { yes: boolean, no: boolean } => {
  if (filter === 'binaryBoth') {
    return turnFiltersOff(filtersState);
  }
  if (filter === 'yes') {
    return Object.assign({}, filtersState, { yes: true, no: false });
  }
  // return for 'no' selected is default
  return Object.assign({}, filtersState, { yes: false, no: true });
};

export const updateFilter = (
  filter: 'initial' | string,
  filtersState: { [filter: string]: boolean },
  isBinaryFilter: boolean = false
): {} => {
  if (isBinaryFilter) {
    // $FlowFixMe
    return updateBinaryFilter(filter, filtersState);
  }
  // if filter is any, we set all filters to true
  if (filter === 'initial') {
    // setting all filters to true
    return turnFiltersOff(filtersState);
  }
  // if filtersState.initial is true, then a filter btn filters result to only that filter
  if (filtersState.initial) {
    const changedFiltersState = {};
    Object.keys(filtersState).forEach(key => {
      if (key !== filter) {
        changedFiltersState[key] = false;
      }
    });
    return Object.assign({}, filtersState, changedFiltersState);
  }
  // if the current filter - which isn't initial - is the only true/on filter, if we toggle it off then let's return to initial state
  // - this prevents filtering down to no results:
  if (Object.values(filtersState).filter(filterVal => filterVal).length === 1 && filtersState[filter]) {
    return turnFiltersOff(filtersState);
  }
  // if filtersState.initial is not true, filter btns toggle that filter
  // creating single prop object - props with key of filter and opposite value of filter in current filter state
  const newFilter = {};
  // $FlowFixMe
  newFilter[filter] = !filtersState[filter];
  return Object.assign({}, filtersState, newFilter);
};

export const resolveFiltersState = (
  option: string,
  targetFilterName: string,
  filterState: { [filterType: string]: { [filter: string]: boolean } }
): {} => {
  const targetFilter: { [filter: string]: boolean } = filterState[targetFilterName];
  const updatedFiltersState = {};
  updatedFiltersState[targetFilterName] = updateFilter(option, targetFilter, isFilterBinary(targetFilter));
  return Object.assign({}, filterState, updatedFiltersState);
};

/**
 * return nested object representing state of all filters for view/component
 * @param {Array<string>} filterNames - the name of each filter type to be composed, will be prop key in returned obj
 * @param {Array<{any}>} filterStates - the states of each filter in return filters obj, should be in same ordered as filterNames
 * @param {Object<any>} currentFilters - the current state of view/component filters - optional
 */
export const composeFilters = (
  filterNames: Array<string>,
  filterStates: Array<{ [filterType: string]: { [filter: string]: string } }>,
  currentFilters: {} = {}
): {} => {
  const newFilters = {};
  filterNames.forEach((name: string, index: number) => {
    newFilters[name] = filterStates[index];
  });
  return Object.assign({}, currentFilters, newFilters);
};

/**
 * side-effect only function, passes params needed to setFilter state to the filterSetter supplied
 * @param {string} filter - the name of the filter being changed
 * @param {*} filterType - nae of the filter-type or filter-parent of the updated filter
 * @param {*} filterState - state of the all filters for the component
 * @param {*} filtersSetter - setter function which sends the evaluated filter state to the dispatcher
 */
export const passFilterUpdateToSetter = (
  filter: string,
  filterType: string,
  filtersState: genFilters,
  filtersSetter: Function
) => {
  filtersSetter(filter, filterType, filtersState);
};

/**
 * -- generalized prop-to-store dispatch handler, for use in body of mapDispatchToProps
 * side-effect only function, passes result of resolveFilterState() to provided actionCreator on through provided dispatch()
 * @param {*} resolveFilterParams - params for resolveFilterState() - a util function
 * @param {*} dispatch - dispatch function to pass: should be 'dispatch' param of mapDispatchToProps
 * @param {*} actionCreator - actionCreator to pass result of resolveFilterParam: should be an exported member of ./actionCreators.js
 */
export const setFilter = (
  resolveFilterParams: {
    filter: string,
    filterType: string,
    filterState: genFilters
  },
  dispatch: Function,
  actionCreator: Function
) => {
  dispatch(
    actionCreator(
      resolveFiltersState(resolveFilterParams.filter, resolveFilterParams.filterType, resolveFilterParams.filterState)
    )
  );
};

/**
 * return value of optional computed object property
 * @param {Object<any>} baseObject - the base object to test props against
 * @param {Array<string>} propNames - array of nested props that could exist on base object, if 1 prop provided, will return val of that prop, if 2 props, will return value of second prop within first prop, etc.
 * @param {boolean} undefinedIfNoProp - if true - if prop does not exist return undefined - otherwise return null; this is for use when returning directly in JSX component prop assignment
 */

export const optionalComputedPropVal = (
  baseObj: any,
  propNames: Array<string>,
  undefinedIfNoProp: boolean = false
): any | null | typeof undefined => {
  const noProp = undefinedIfNoProp ? undefined : null;
  // we're always going to test the base object against the 0'th index of propNames, so here's a shorthand
  const hasPropShorthand = () => {
    if (Object.prototype.hasOwnProperty.call(baseObj, propNames[0])) {
      return true;
    }
    return false;
  };

  if (propNames.length === 1) {
    // if we only have one prop to test - we return value of baseObj[deepestProperty] if test passes; on fail we return noProp val
    if (hasPropShorthand()) {
      return baseObj[propNames[0]];
    }
    return noProp;
  }

  if (hasPropShorthand()) {
    // If we have more than one propName and the baseObj has propNames[0], we re-run the function with baseObj[propNames[0]] as the new base object,
    // we slice propNames by just the first index to return a property list without the first property we've made the new baseObj with
    // and we pass the undefinedIfNoProp val along as is.
    return optionalComputedPropVal(baseObj[propNames[0]], propNames.slice(1), undefinedIfNoProp);
  }

  return noProp;
};
