// @flow

import React, { Component } from 'react';
import FarmerCard from './FarmerCard';

// $FlowFixMe
class Farmers extends Component {
  constructor() {
    super();
    // $FlowFixMe
    this.state = {
      pageNumber: 1
    };
  }

  props: { farmers: Array<FarmerBrief>, pages: [], cardsPerPage: number };

  updatePage = (event: any) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(event.target.innerHTML, 10) });

  render() {
    // $FlowFixMe
    const thisPage = this.state.pageNumber;

    const pagination = (
      <div>
        {this.props.pages.map(val => (
          <button key={val} onClick={this.updatePage}>
            {val}
          </button>
        ))}
      </div>
    );

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
        {pagination}
      </section>
    );
  }
}

export default Farmers;
