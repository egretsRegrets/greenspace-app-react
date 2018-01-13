// @flow
import { initializeFilterState } from './utils';

const initialState = {
  filters: {}
};

initialState.filters.greenspaces = initializeFilterState({
  farmerDesired: ['yes', 'no'],
  plotSize: ['initial', 'largePlot', 'microPlot', 'backyard', 'frontyard', 'fullyard']
});

export default initialState;
