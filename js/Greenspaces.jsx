// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import setGreenspacesFilters from './actionCreators';
import GreenspaceCardList from './GreenspaceCardList';
import FilterButton from './utilComponents/FilterButton';
import { NextPreviousBtns } from './utilComponents/PageControls';

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

  updateFilters = event => this.props.setFilters(event.target.value, this.props.filters);

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

  passesSeekingFarmerFilters = (seekingFarmer: boolean) => {
    if (this.props.filters.seekingFarmer.either) {
      return true;
    }
    if (seekingFarmer) {
      if (this.props.filters.seekingFarmer.yes) {
        return true;
      }
    }
    if (!this.props.filters.seekingFarmer) {
      return true;
    }
    return false;
  };

  render() {
    const cardsPerPage = 8;
    const filterBtnsPlotSizeTxt = ['Any', 'Large Plot', 'Micro Plot', 'Backyard', 'Frontyard', 'Full Yard'];
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
                <div className="flex justify-start">
                  {Object.keys(this.props.filters.plotSize).map((filterKey: string, index) => (
                    <FilterButton
                      key={filterKey}
                      val={filterKey}
                      text={filterBtnsPlotSizeTxt[index]}
                      updateFilter={this.updateFilters}
                    />
                  ))}
                </div>
              </div>
              <div className="mr4 flex justify-start">
                <button className="mr3 pl1 pr3 pv1 bg-transparent bt-0 br-0 bb bl-0 bw2 b--green fw6 f5 avenir tl pointer">
                  Seeking Farmers
                </button>
                <div className="flex justify-start">
                  {Object.keys(this.props.filters.seekingFarmer).map((filterKey: string) => (
                    <FilterButton
                      key={filterKey}
                      val={filterKey}
                      text={filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                      updateFilter={this.updateFilters}
                    />
                  ))}
                </div>
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

function newFilters(filter: string, filtersType: 'plotSize' | 'seekingFarmer', curFilters: greenspacesFilters) {
  if (filter === 'any' || filter === 'either') {
    if (Object.values(curFilters[filtersType]).includes(false)) {
      const targetFilters = curFilters[filtersType];
      Object.keys(targetFilters).forEach(key => {
        // $FlowFixMe
        if (targetFilters[key] === false) {
          // $FlowFixMe
          targetFilters[key] = true;
        }
      });
      const updatedFilters = curFilters;
      // $FlowFixMe
      updatedFilters[filtersType] = targetFilters;
      return updatedFilters;
    }
    // if all of the filters of the filter type are already true, we just return curFilters
    return curFilters;
  }
  const targetFilters = curFilters[filtersType];
  // flip the bool of the filter in target
  targetFilters[filter] = !curFilters[filtersType][filter];
  // 'any' or 'either' will be index 0 of targetFilters,
  // if index 0 is true and any values of targetFilters props are false, index 0 should be flipped.
  if (Object.values(targetFilters)[0] === true && Object.values(targetFilters).includes(false)) {
    // $FlowFixMe
    targetFilters[Object.keys(targetFilters)[0]] = false;
  }
  // if index 0 is false, and the values of targetFilters sliced except for them - index 0 - don't include false, index 0 should be flipped
  if (
    Object.values(targetFilters)[0] === false &&
    !Object.values(targetFilters)
      .slice(1)
      .includes(false)
  ) {
    // $FlowFixMe
    targetFilters[Object.keys(targetFilters)[0]] = true;
  }
  const updatedFilters = curFilters;
  // $FlowFixMe
  updatedFilters[filtersType] = targetFilters;
  return updatedFilters;
}

const mapStateToProps = state => ({ filters: state.greenspacesFilters });
const mapDispatchToProps = (dispatch: Function) => ({
  setFilters(filter, filters) {
    // selecting the correct filter type, plotSize vs seekingFarmer based on filter button val
    let filterType = 'seekingFarmer';
    if (!Object.keys(filters[filterType]).includes(filter)) {
      filterType = 'plotSize';
    }
    dispatch(setGreenspacesFilters(newFilters(filter, filterType, filters)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Greenspaces);
