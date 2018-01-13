// @flow

import { updateFilterState, composeFilters } from '../utils';

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
test('updateFilterState with binaryFilters - test for value = any', () => {
  // initial state
  expect(updateFilterState('any', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.initial);
  expect(updateFilterState('any', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.initial);
  expect(updateFilterState('any', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.initial);
});

// tests binary filter - user selecting btn with 'yes' value
test('updateFilterState with binaryFilters - test for value = yes', () => {
  // initial state
  expect(updateFilterState('yes', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.yes);
  expect(updateFilterState('yes', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.yes);
  expect(updateFilterState('yes', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.yes);
});

// tests binary filter - user selecting btn with 'yes' value
test('updateFilterState with binaryFilters - test for value = no', () => {
  // initial state
  expect(updateFilterState('no', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.no);
  expect(updateFilterState('no', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.no);
  expect(updateFilterState('no', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.no);
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

test('updateFilterState with non-binary: filter1 selected from initial state', () => {
  expect(updateFilterState('filter1', exampGeneralFilters.initial)).toEqual(exampGeneralFilters.fromInitialSel1);
});

test('updateFilterState with non-binary: filter2 selected from filter1 already selected', () => {
  expect(updateFilterState('filter2', exampGeneralFilters.fromInitialSel1)).toEqual(exampGeneralFilters.from1Sel2);
});

test('updateFilterState with non-binary: filter2 selected from filter1 and filter2 already selected', () => {
  expect(updateFilterState('filter2', exampGeneralFilters.from1Sel2)).toEqual(exampGeneralFilters.from2And1Sel2);
});

test('updateFilterState with non-binary: any selected from filter1 and filter2 already selected', () => {
  expect(updateFilterState('any', exampGeneralFilters.from1Sel2)).toEqual(exampGeneralFilters.initial);
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
      [
        updateFilterState('filter3', exampGeneralFilters.fromInitialSel1),
        updateFilterState('yes', farmerDesiredFilter.no, true)
      ],
      preComposeFilters
    )
  ).toEqual(postComposeFilters);
});
