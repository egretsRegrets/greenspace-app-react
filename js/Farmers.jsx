// @flow

import React, { Component } from 'react';
import FarmerCard from './FarmerCard';
import PageBtns from './utilComponents/PageBtns';

// $FlowFixMe
class Farmers extends Component {
  constructor() {
    super();
    // $FlowFixMe
    this.state = {
      pageNumber: 1
    };
  }

  props: { farmers: Array<FarmerBrief>, cardsPerPage: number };

  updatePage = (event: any) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(event.target.innerHTML, 10) });

  render() {
    // $FlowFixMe
    const thisPage = this.state.pageNumber;

    const cards = (
      <div className="flex flex-wrap justify-start pv4">
        {// $FlowFixMe
        this.props.farmers
          // $FlowFixMe
          .slice(
            // $FlowFixMe
            this.state.pageNumber * this.props.cardsPerPage - (this.props.cardsPerPage - 1) - 1,
            // $FlowFixMe
            thisPage * this.props.cardsPerPage
          )
          .map((farmer: FarmerBrief) => <FarmerCard key={farmer.id} {...farmer} />)}
      </div>
    );

    return (
      <section className="pv6 ph5">
        {/* delimit num per section by specific number, add margin to bottom of each section */}
        {cards}
        <PageBtns
          dataLength={this.props.farmers.length}
          cardsPerPage={this.props.cardsPerPage}
          clickHandler={this.updatePage}
        />
      </section>
    );
  }
}

export default Farmers;
