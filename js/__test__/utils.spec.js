// @flow

import { updateFilters } from '../utils';

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
test('updateFilters with binaryFilters - test for value = any', () => {
  // initial state
  expect(updateFilters('any', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.initial);
  expect(updateFilters('any', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.initial);
  expect(updateFilters('any', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.initial);
});

// tests binary filter - user selecting btn with 'yes' value
test('updateFilters with binaryFilters - test for value = yes', () => {
  // initial state
  expect(updateFilters('yes', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.yes);
  expect(updateFilters('yes', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.yes);
  expect(updateFilters('yes', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.yes);
});

// tests binary filter - user selecting btn with 'yes' value
test('updateFilters with binaryFilters - test for value = no', () => {
  // initial state
  expect(updateFilters('no', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.no);
  expect(updateFilters('no', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.no);
  expect(updateFilters('no', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.no);
});

const exampGeneralFilters = {
  initial: {
    none: true,
    filter1: true,
    filter2: true,
    filter3: true
  },
  fromInitialSel1: {
    none: false,
    filter1: true,
    filter2: false,
    filter3: false
  },
  from1Sel2: {
    none: false,
    filter1: true,
    filter2: true,
    filter3: false
  },
  from2And1Sel2: {
    none: false,
    filter1: true,
    filter2: false,
    filter3: false
  }
};

// test general/non-binary filter
test('updateFilters with non-binary: filter1 selected from initial state', () => {
  expect(updateFilters('filter1', exampGeneralFilters.initial)).toEqual(exampGeneralFilters.fromInitialSel1);
});

test('updateFilters with non-binary: filter2 selected from filter1 already selected', () => {
  expect(updateFilters('filter2', exampGeneralFilters.fromInitialSel1)).toEqual(exampGeneralFilters.from1Sel2);
});

test('updateFilters with non-binary: filter2 selected from filter1 and filter2 already selected', () => {
  expect(updateFilters('filter2', exampGeneralFilters.from1Sel2)).toEqual(exampGeneralFilters.from2And1Sel2);
});

test('updateFilters with non-binary: any selected from filter1 and filter2 already selected', () => {
  expect(updateFilters('any', exampGeneralFilters.from1Sel2)).toEqual(exampGeneralFilters.initial);
});
