// @flow

import React from 'react';
import GreenspaceCard from './GreenspaceCard';
import { paginationSlice } from './utils';

const GreenspaceCardList = (props: {
  greenspaceCardList: Array<Greenspace>,
  currentPageNumber: number | null,
  cardsPerPage: number | null
}) => (
  <section className="flex flex-wrap justify-start pv4">
    {/* 
            if pagination info was passed in props, then list the greenspace cards sliced for current page and cars per pages
            else just map cards from all of the greenspaces passed - this way we don't have to always specify pagination for greenspaces 
          */}
    {props.currentPageNumber && props.cardsPerPage
      ? paginationSlice(props.greenspaceCardList, props.currentPageNumber, props.cardsPerPage).map(
          (greenspace: Greenspace) => <GreenspaceCard {...greenspace} key={greenspace.id} />
        )
      : props.greenspaceCardList.map((greenspace: Greenspace) => (
          <GreenspaceCard {...greenspace} key={greenspace.id} />
        ))}
  </section>
);

export default GreenspaceCardList;
