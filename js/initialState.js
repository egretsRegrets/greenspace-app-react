const initialState = {
  greenspacesFilters: {
    plotSize: {
      any: true,
      largePlot: false,
      microPlot: false,
      backYard: false,
      frontYard: false,
      fullYard: false
    },
    seekingFarmer: {
      either: true,
      yes: false,
      no: false
    }
  }
};

export default initialState;
