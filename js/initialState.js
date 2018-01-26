// @flow
import { initializeFilterState } from './utils';

const initialState = {
  filters: {}
};

initialState.filters.greenspaces = initializeFilterState({
  farmerDesired: ['yes', 'no'],
  plotSize: ['initial', 'largePlot', 'microPlot', 'backyard', 'frontyard', 'fullyard']
});

initialState.filters.farmers = initializeFilterState({
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
});

export default initialState;
