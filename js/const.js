// @flow

const FilterCatProps: FiltersProps = {
  greenspaces: {
    filters: ['plotSize', 'farmerDesired'],
    titles: ['Plot Size', 'Seeking Farmers'],
    options: {
      plotSize: ['initial', 'largePlot', 'microPlot', 'backyard', 'frontyard', 'fullyard'],
      farmerDesired: ['yes', 'no']
    },
    optionsText: {
      plotSize: ['Any', 'Large Plot', 'Micro Plot', 'Backyard', 'Frontyard', 'Full Yard'],
      farmerDesired: ['Yes', 'No']
    },
    binaryFilters: ['farmerDesired'],
    binaryFilterProps: {
      farmerDesired: {
        btnText: 'Either'
      }
    }
  }
};

export default FilterCatProps;
