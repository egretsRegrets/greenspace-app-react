// @flow

import React, { Component } from 'react';
import FarmerCardList from './FarmerCardList';
import { NextPreviousBtns } from './utilComponents/PageControls';

// $FlowFixMe
class Farmers extends Component {
  constructor() {
    super();
    // $FlowFixMe
    this.state = {
      pageNumber: 1
    };
  }

  props: { farmers: Array<FarmerBrief> };

  updatePage = (val: number) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(val, 10) });

  render() {
    const cardsPerPage = 8;

    return (
      <section className="ph5">
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

export default Farmers;
