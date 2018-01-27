// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FarmerCardList from './FarmerCardList';
import Filters from './utilComponents/Filters';
import { NextPreviousBtns } from './utilComponents/PageControls';
import { passFilterUpdateToSetter, setFilter } from './utils';
import { setFarmersFilters } from './actionCreators';

// $FlowFixMe
class Farmers extends Component {
  constructor() {
    super();
    // $FlowFixMe
    this.state = {
      pageNumber: 1
    };
  }

  props: { farmers: Array<FarmerBrief>, filters: genFilters, filtersSetter: Function };

  updatePage = (val: number) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(val, 10) });

  render() {
    const cardsPerPage = 8;

    return (
      <section className="ph5">
        <Filters
          filterCat="farmers"
          filters={this.props.filters}
          updateFilters={resolveFiltersParams =>
            passFilterUpdateToSetter(resolveFiltersParams, this.props.filtersSetter)
          }
        />
        <FarmerCardList
          farmerCardList={this.props.farmers}
          // $FlowFixMe
          currentPageNumber={this.state.pageNumber}
          cardsPerPage={cardsPerPage}
        />
        <NextPreviousBtns
          // $FlowFixMe
          pageNumber={this.state.pageNumber}
          dataLength={this.props.farmers.length}
          cardsPerPage={cardsPerPage}
          clickHandler={this.updatePage}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({ filters: state.farmersFilters });
const mapDispatchToProps = (dispatch: Function) => ({
  filtersSetter(resolveFiltersParams: resolveFiltersParams) {
    setFilter(resolveFiltersParams, setFarmersFilters, dispatch);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Farmers);
