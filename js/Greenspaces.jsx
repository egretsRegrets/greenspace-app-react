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
                  <button className="bw0 bg-transparent avenir f6 pointer">All</button>
                  <button className="bw0 bg-transparent avenir f6 pointer">Large Plot</button>
                  <button className="bw0 bg-transparent avenir f6 pointer">Micro Plot</button>
                  <button className="bw0 bg-transparent avenir f6 pointer">Backyard</button>
                  <button className="bw0 bg-transparent avenir f6 pointer">Front-Yard</button>
                  <button className="bw0 bg-transparent avenir f6 pointer">Full-Yard</button>
                </div>
              </div>
              <div className="mr4 flex justify-start">
                <button className="mr3 pl1 pr3 pv1 bg-transparent bt-0 br-0 bb bl-0 bw2 b--green fw6 f5 avenir tl pointer">
                  Seeking Farmers
                </button>
                <div className="flex justify-start">
                  <button className="bw0 bg-transparent avenir f6 pointer">Either</button>
                  <button className="bw0 bg-transparent avenir f6 pointer">Yes</button>
                  <button className="bw0 bg-transparent avenir f6 pointer">No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
