// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGreenspacesFilters } from './actionCreators';
import GreenspaceCardList from './GreenspaceCardList';
import Filters from './utilComponents/Filters';
// import NoFilteredEntitiesMsg from './utilComponents/NoFilteredEntitiesMsg';
import { NextPreviousBtns } from './utilComponents/PageControls';
import { passFilterUpdateToSetter, setFilter, getSelectedFiltersMap } from './utils';

type Props = { greenspaces: Array<Greenspace>, filters: genFilters, filtersSetter: Function };

type State = { pageNumber: number };

class Greenspaces extends Component<Props, State> {
  state = {
    pageNumber: 1
  };

  updatePage = (val: number) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(val, 10) });

  passesFarmerDesiredFilter = (farmerDesired: boolean, selectedFilters: Array<string>) => {
    if (selectedFilters.includes('yes')) {
      // If no is also a selected filter than filters.farmerDesired is effectively 'either' and we don't filter any greenspaces
      if (selectedFilters.includes('no')) {
        return true;
      }
      // greenspace.farmerDesired(true) === selectedFilters only element('yes')
      if (farmerDesired) {
        return true;
      }
      // greenspace.farmerDesired(false) !== selectedFilters only element('yes')
      return false;
    }
    // greenspace.farmerDesired(false) === selectedFilters only element('no')
    if (!farmerDesired) {
      return true;
    }
    return false;
  };

  passesPlotSizeFilter = (plotSize: Array<plotSize>, selectedFilters: Array<string>) => {
    // if selectedFilters includes initial, then we return any filter - state is initial and nothing is being filtered out
    if (selectedFilters.includes('initial')) {
      return true;
    }
    const selectedFiltersIncludesPlotSize = plotSize.some(plotSizeTag => selectedFilters.includes(plotSizeTag));
    if (selectedFiltersIncludesPlotSize) {
      return true;
    }
    return false;
  };

  filterGreenspaces = () => {
    const selectedFiltersMap: { plotSize: Array<string>, farmerDesired: Array<string> } = getSelectedFiltersMap(
      this.props.filters
    );
    const filteredGreenspaces = this.props.greenspaces.filter(
      (greenspace: Greenspace) =>
        this.passesFarmerDesiredFilter(greenspace.farmerDesired, selectedFiltersMap.farmerDesired) &&
        this.passesPlotSizeFilter(greenspace.plotSize, selectedFiltersMap.plotSize)
    );
    return filteredGreenspaces;
  };

  render() {
    const cardsPerPage = 8;
    return (
      <section className="ph5">
        <Filters
          filterCat="greenspaces"
          filters={this.props.filters}
          updateFilters={resolveFiltersParams =>
            passFilterUpdateToSetter(resolveFiltersParams, this.props.filtersSetter)
          }
        />
        {/* <NoFilteredEntitiesMsg entitiesType /> */}
        <GreenspaceCardList
          greenspaceCardList={this.filterGreenspaces()}
          currentPageNumber={this.state.pageNumber}
          cardsPerPage={cardsPerPage}
        />
        <div className="pl5">
          <NextPreviousBtns
            pageNumber={this.state.pageNumber}
            dataLength={this.props.greenspaces.length}
            cardsPerPage={cardsPerPage}
            clickHandler={this.updatePage}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({ filters: state.greenspacesFilters });
const mapDispatchToProps = (dispatch: Function) => ({
  filtersSetter(resolveFiltersParams: resolveFiltersParams) {
    setFilter(resolveFiltersParams, setGreenspacesFilters, dispatch);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Greenspaces);
