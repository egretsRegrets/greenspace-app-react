// @flow

import { updateFilter, composeFilters, resolveFiltersState } from '../utils';

const farmerDesiredFilter = {
  initial: {
    yes: true,
    no: true
  },
  yes: {
    yes: true,
    no: false
  },
  no: {
    yes: false,
    no: true
  }
};

// tests binary filter - user selecting btn with 'any' value
test('updateFilter with binaryFilters - test for value = any', () => {
  // initial state
  expect(updateFilter('any', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.initial);
  expect(updateFilter('any', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.initial);
  expect(updateFilter('any', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.initial);
});

// tests binary filter - user selecting btn with 'yes' value
test('updateFilter with binaryFilters - test for value = yes', () => {
  // initial state
  expect(updateFilter('yes', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.yes);
  expect(updateFilter('yes', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.yes);
  expect(updateFilter('yes', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.yes);
});

// tests binary filter - user selecting btn with 'yes' value
test('updateFilter with binaryFilters - test for value = no', () => {
  // initial state
  expect(updateFilter('no', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.no);
  expect(updateFilter('no', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.no);
  expect(updateFilter('no', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.no);
});

// test general/non-binary filter
const exampGeneralFilters = {
  initial: {
    initial: true,
    filter1: true,
    filter2: true,
    filter3: true
  },
  fromInitialSel1: {
    initial: false,
    filter1: true,
    filter2: false,
    filter3: false
  },
  from1Sel2: {
    initial: false,
    filter1: true,
    filter2: true,
    filter3: false
  },
  from2And1Sel2: {
    initial: false,
    filter1: true,
    filter2: false,
    filter3: false
  }
};

test('updateFilter with non-binary: filter1 selected from initial state', () => {
  expect(updateFilter('filter1', exampGeneralFilters.initial)).toEqual(exampGeneralFilters.fromInitialSel1);
});

test('updateFilter with non-binary: filter2 selected from filter1 already selected', () => {
  expect(updateFilter('filter2', exampGeneralFilters.fromInitialSel1)).toEqual(exampGeneralFilters.from1Sel2);
});

test('updateFilter with non-binary: filter2 selected from filter1 and filter2 already selected', () => {
  expect(updateFilter('filter2', exampGeneralFilters.from1Sel2)).toEqual(exampGeneralFilters.from2And1Sel2);
});

test('updateFilter with non-binary: any selected from filter1 and filter2 already selected', () => {
  expect(updateFilter('any', exampGeneralFilters.from1Sel2)).toEqual(exampGeneralFilters.initial);
});

// testing composeFilters

const preComposeFilters = {
  nonBinary: {
    initial: false,
    filter1: true,
    filter2: false,
    filter3: false
  },
  binary: {
    yes: false,
    no: true
  }
};

const postComposeFilters = {
  nonBinary: {
    initial: false,
    filter1: true,
    filter2: false,
    filter3: true
  },
  binary: {
    yes: true,
    no: false
  }
};

test('composeFilters with one binary filter, one non-binary', () => {
  expect(
    composeFilters(
      ['nonBinary', 'binary'],
      [updateFilter('filter3', exampGeneralFilters.fromInitialSel1), updateFilter('yes', farmerDesiredFilter.no, true)],
      preComposeFilters
    )
  ).toEqual(postComposeFilters);
});

// testing resolveFiltersState

const preResolveFilters = {
  nonBinary: {
    initial: false,
    filter1: true,
    filter2: false,
    filter3: false
  },
  binary: {
    yes: true,
    no: false
  }
};

const postResolveFilters1 = {
  nonBinary: {
    initial: false,
    filter1: true,
    filter2: false,
    filter3: true
  },
  binary: {
    yes: true,
    no: false
  }
};

const postResolveFilters2 = {
  nonBinary: {
    initial: false,
    filter1: true,
    filter2: false,
    filter3: true
  },
  binary: {
    yes: false,
    no: true
  }
};

test('test resovleFiltersState() with option change to 1 non-binary filter, followed by 1 binary filter in 2 filter state', () => {
  expect(resolveFiltersState('filter3', preResolveFilters)).toEqual(postResolveFilters1);
  expect(resolveFiltersState('no', postResolveFilters1)).toEqual(postResolveFilters2);
});
