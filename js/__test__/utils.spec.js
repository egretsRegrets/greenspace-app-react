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
test('updateFilters with binaryFilters', () => {
  // initial state
  expect(updateFilters('any', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.initial);
  expect(updateFilters('any', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.initial);
  expect(updateFilters('any', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.initial);
});

// tests binary filter - user selecting btn with 'yes' value
test('updateFilters with binaryFilters', () => {
  // initial state
  expect(updateFilters('yes', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.yes);
  expect(updateFilters('yes', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.yes);
  expect(updateFilters('yes', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.yes);
});

// tests binary filter - user selecting btn with 'yes' value
test('updateFilters with binaryFilters', () => {
  // initial state
  expect(updateFilters('no', farmerDesiredFilter.initial, true)).toEqual(farmerDesiredFilter.no);
  expect(updateFilters('no', farmerDesiredFilter.yes, true)).toEqual(farmerDesiredFilter.no);
  expect(updateFilters('no', farmerDesiredFilter.no, true)).toEqual(farmerDesiredFilter.no);
});
