// @flow

import React, { Component } from 'react';
import FarmerCard from './FarmerCard';
import { NextPreviousBtns } from './utilComponents/PageControls';
import { PaginationSlice } from './utils';

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
    const cards = (
      <div className="flex flex-wrap justify-start pv4">
        {// $FlowFixMe
        PaginationSlice(this.props.farmers, this.state.pageNumber, cardsPerPage).map((farmer: FarmerBrief) => (
          <FarmerCard key={farmer.id} {...farmer} />
        ))}
      </div>
    );

    return (
      <section className="ph5">
        {/* delimit num per section by specific number, add margin to bottom of each section */}
        {cards}
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
