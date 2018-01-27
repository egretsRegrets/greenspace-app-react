// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGreenspacesFilters } from './actionCreators';
import GreenspaceCardList from './GreenspaceCardList';
import Filters from './utilComponents/Filters';
import { NextPreviousBtns } from './utilComponents/PageControls';
import { passFilterUpdateToSetter, setFilter } from './utils';

// $FlowFixMe
class Greenspaces extends Component {
  constructor() {
    super();
    // $FlowFixMe
    this.state = {
      pageNumber: 1
    };
  }

  props: {
    greenspaces: Array<Greenspace>,
    filters: greenspacesFilters,
    filtersSetter: Function
  };

  gsFilterNameCorrection = ['large plot', 'micro plot', 'backyard', 'front-yard', 'full-yard'];

  updatePage = (val: number) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(val, 10) });

  passesPlotSizeFilters = (plotSizeTags: Array<greenspaceTags>): boolean => {
    if (this.props.filters.plotSize.any === true) {
      return true;
    }
    const nameCorrectedFilters = Object.keys(this.props.filters.plotSize)
      .slice(1)
      .map((tag: string, index) => {
        if (this.props.filters.plotSize[tag]) {
          return this.gsFilterNameCorrection[index];
        }
        return null;
      });
    return nameCorrectedFilters.some(tag => plotSizeTags.indexOf(tag) >= 0);
  };

  passesSeekingFarmerFilters = (farmerDesired: boolean) => {
    const seekingFarmer = this.props.filters.farmerDesired.yes;
    const seeTheFarmers = this.props.filters.farmerDesired.no;
    // filter.farmerDesired is in initial state
    if (seekingFarmer && seeTheFarmers) {
      return true;
    }
    // filter.farmerDesired.yes and greenspace.farmerDesired are true
    if (seekingFarmer && farmerDesired) {
      return true;
    }
    // filter.farmerDesired.no is true and greenspace.farmerDesired is false
    if (seeTheFarmers && !farmerDesired) {
      return true;
    }
    return false;
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
        <GreenspaceCardList
          greenspaceCardList={this.props.greenspaces.filter(
            (greenspace: Greenspace) =>
              this.passesPlotSizeFilters(greenspace.tags) && this.passesSeekingFarmerFilters(greenspace.farmerDesired)
          )}
          // $FlowFixMe
          currentPageNumber={this.state.pageNumber}
          cardsPerPage={cardsPerPage}
        />
        <div className="pl5">
          <NextPreviousBtns
            // $FlowFixMe
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
