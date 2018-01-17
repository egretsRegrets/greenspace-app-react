// @flow

const FilterCatProps: FiltersProps = {
  greenspaces: {
    filters: ['plotSize', 'farmerDesired'],
    titles: ['Plot Size', 'Seeking Farmers'],
    reducer: 'greenspaces',
    action: 'setGreenspacesFilters',
    binaryFilters: ['farmerDesired'],
    binaryFilterProps: [
      {
        filter: 'farmerDesired',
        btnText: 'Either'
      }
    ]
  }
};

export default FilterCatProps;
