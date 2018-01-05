// @flow

import React, { Component } from 'react';
import GreenspaceCardList from './GreenspaceCardList';
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
    greenspaces: Array<Greenspace>
  };

  updatePage = (val: number) =>
    // $FlowFixMe
    this.setState({ pageNumber: parseInt(val, 10) });

  render() {
    const cardsPerPage = 8;
    return (
      <section>
        <GreenspaceCardList
          greenspaceCardList={this.props.greenspaces}
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

export default Greenspaces;
