// @flow
import { initializeFilterState } from './utils';

const initialState = {
  filters: {}
};

initialState.filters.greenspaces = initializeFilterState({
  farmerDesired: ['yes', 'no'],
  plotSize: ['none', 'largePlot', 'microPlot', 'backyard', 'frontyard', 'fullyard']
});

export default initialState;
