// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import setGreenspacesFilters from './actionCreators';
import GreenspaceCardList from './GreenspaceCardList';
import FilterButtonRow from './utilComponents/FilterButtonRow';
import { NextPreviousBtns } from './utilComponents/PageControls';
import { resolveFiltersState } from './utils';

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
    setFilters: Function
  };

  gsFilterNameCorrection = ['large plot', 'micro plot', 'backyard', 'front-yard', 'full-yard'];

  updatePage = (val: number) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(val, 10) });

  updateFilterOption = (option: string, filter: string) => this.props.setFilters(option, filter, this.props.filters);

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
    const btnTxtPlotSize = ['Any', 'Large Plot', 'Micro Plot', 'Backyard', 'Frontyard', 'Full Yard'];
    return (
      <section>
        <div className="pt4 pb0">
          <div className="ph5">
            <button
              className="bt-0 br-0 bb-0 bl-0 bg-transparent pointer flex justify-start items-center"
              style={{ paddingLeft: '0' }}
            >
              <h3 className="mr2 f3 fw6 bw0 avenir near-black">Filters</h3>
              <svg
                className="w1 near-black"
                data-icon="chevronDown"
                viewBox="0 0 32 32"
                style={{ fill: 'currentcolor' }}
              >
                <title>chevronDown icon</title>
                <path d="M1 18 L5 14 L16 24 L27 14 L31 18 L16 32 Z" />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="mr4 flex justify-start">
                <button className="mr3 pl1 pr3 pv1 bg-transparent bt-0 br-0 bb bl-0 bw2 b--green fw6 f5 avenir tl pointer">
                  Plot Size
                </button>
                <FilterButtonRow
                  filter="plotSize"
                  filterState={this.props.filters.plotSize}
                  filterOptions={Object.keys(this.props.filters.plotSize)}
                  changeFilter={this.updateFilterOption}
                  btnTextArr={btnTxtPlotSize}
                />
              </div>
              <div className="mr4 flex justify-start">
                <button className="mr3 pl1 pr3 pv1 bg-transparent bt-0 br-0 bb bl-0 bw2 b--green fw6 f5 avenir tl pointer">
                  Seeking Farmers
                </button>
                <FilterButtonRow
                  filter="farmerDesired"
                  filterState={this.props.filters.farmerDesired}
                  filterOptions={Object.keys(this.props.filters.farmerDesired)}
                  changeFilter={this.updateFilterOption}
                  btnTextArr={['Yes', 'No']}
                  includesBinaryBoth
                  binaryBothBtnText="Either"
                />
              </div>
            </div>
          </div>
        </div>
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
  setFilters(option, filter, filters) {
    // $FlowFixMe - warning as resolveFiltersState does not explicitly return type greenspacesFilters
    dispatch(setGreenspacesFilters(resolveFiltersState(option, filter, filters)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Greenspaces);
