// @flow

import React, { Component } from 'react';
import GreenspaceCard from './GreenspaceCard';
import { NextPreviousBtns } from './utilComponents/PageControls';
import { PaginationSlice } from './utils';

// $FlowFixMe
class GreenspaceCardList extends Component {
  constructor() {
    super();
    // $FlowFixMe
    this.state = {
      pageNumber: 1
    };
  }

  props: { greenspaceCardList: Array<Greenspace> };

  updatePage = (val: number) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(val, 10) });

  render() {
    const cardsPerPage = 8;
    return (
      <div className="ph5">
        <section className="flex flex-wrap justify-start pv4">
          {// $FlowFixMe
          PaginationSlice(this.props.greenspaceCardList, this.state.pageNumber, cardsPerPage).map(
            (greenspace: Greenspace) => <GreenspaceCard {...greenspace} key={greenspace.id} />
          )}
        </section>
        <NextPreviousBtns
          // $FlowFixMe
          pageNumber={this.state.pageNumber}
          dataLength={this.props.greenspaceCardList.length}
          cardsPerPage={cardsPerPage}
          clickHandler={this.updatePage}
        />
      </div>
    );
  }
}

export default GreenspaceCardList;
