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
        'Fruits',
        'Vegetables',
        'Herbs',
        'Farming Education',
        'Home Gardening',
        'Sustainability',
        'Organic',
        'CSA',
        'Farmers Market'
      ]
    },
    optionsText: {
      experience: ['Expert,', 'Intermediate,', 'Novice'],
      skills: [
        'Fruits',
        'Vegetables',
        'Herbs',
        'Farming Education',
        'Home Gardening',
        'Sustainability',
        'Organic',
        'CSA',
        'Farmers Market'
      ]
    }
  }
};

export default FilterCatProps;
