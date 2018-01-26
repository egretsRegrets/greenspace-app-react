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
  },
  farmers: {
    filters: ['experience', 'skills'],
    titles: ['Experience Level', 'Farmer Skills'],
    options: {
      experience: ['expert', 'intermediate', 'novice'],
      skills: [
        'fruits',
        'vegetables',
        'herbs',
        'farming education',
        'home gardening',
        'sustainability',
        'organic',
        'CSA',
        'farmers market'
      ]
    },
    optionsText: {
      experience: ['Expert,', 'Intermediate,', 'Novice'],
      skills: [
        'fruits',
        'vegetables',
        'herbs',
        'farming education',
        'home gardening',
        'sustainability',
        'organic',
        'CSA',
        'farmers market'
      ]
    }
  }
};

export default FilterCatProps;
