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

const filterFromOption = (option: string, filterState: {}): string | null => {
  let filter: string | null = null;
  Object.keys(filterState).forEach(key => {
    if (Object.keys(filterState[key]).includes(option)) {
      filter = key;
    }
  });
  return filter;
};

// for updating a filter with two options, one of which, if true, sets the other to false:
const updateBinaryFilter = (
  filter: 'yes' | 'no' | 'any',
  filtersState: { yes: boolean, no: boolean }
): { yes: boolean, no: boolean } => {
  if (filter === 'any') {
    return Object.assign({}, filtersState, { yes: true, no: true });
  }
  if (filter === 'yes') {
    return Object.assign({}, filtersState, { yes: true, no: false });
  }
  // return for 'no' selected is default
  return Object.assign({}, filtersState, { yes: false, no: true });
};

export const updateFilter = (filter: 'any' | string, filtersState: {}, isBinaryFilter: boolean = false): {} => {
  if (isBinaryFilter) {
    // $FlowFixMe
    return updateBinaryFilter(filter, filtersState);
  }
  // if filter is any, we set all filters to true
  if (filter === 'any') {
    // setting all filters to true
    const changedFiltersState = {};
    Object.keys(filtersState).forEach(key => {
      // only add/set prop if prop is not already true
      if (!filtersState[key]) {
        changedFiltersState[key] = true;
      }
    });
    return Object.assign({}, filtersState, changedFiltersState);
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
  // if filtersState.initial is not true, filter btns toggle that filter
  // creating single prop object - props with key of filter and opposite value of filter in current filter state
  const newFilter = {};
  // $FlowFixMe
  newFilter[filter] = !filtersState[filter];
  return Object.assign({}, filtersState, newFilter);
};

export const resolveFiltersState = (option: string, filterState: {}): {} => {
  const updatedFilter = filterFromOption(option, filterState);
  if (updatedFilter === null) {
    // if no filter exists that contains the provided option - then the option given is incompatible - check ui element val
    // CONSOLE WARNING - replace console.error with dev error surfacing in components
    console.error(`the provided option value, ${option}, does not exist in filters: ${JSON.stringify(filterState)}`);
    return filterState;
  }
  // targetFilter is the filter in filterState that will be updated
  const targetFilter = filterState[updatedFilter];
  const updatedFiltersState = {};
  updatedFiltersState[updatedFilter] = updateFilter(option, targetFilter, isFilterBinary(targetFilter));
  return Object.assign({}, filterState, updatedFiltersState);
};

/**
 * return nested object representing state of all filters for view/component
 * @param {Array<string>} filterNames - the name of each filter type to be composed, will be prop key in returned obj
 * @param {Array<{any}>} filterStates - the states of each filter in return filters obj, should be in same ordered as filterNames
 * @param {Object<any>} currentFilters - the current state of view/component filters - optional
 */
export const composeFilters = (filterNames: Array<string>, filterStates: Array<{}>, currentFilters: {} = {}): {} => {
  const newFilters = {};
  filterNames.forEach((name: string, index: number) => {
    newFilters[name] = filterStates[index];
  });
  return Object.assign({}, currentFilters, newFilters);
};
