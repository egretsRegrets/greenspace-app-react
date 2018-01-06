// @flow

import React from 'react';
import FarmerCard from './FarmerCard';
import { paginationSlice } from './utils';

const FarmerCardList = (props: {
  farmerCardList: Array<FarmerBrief>,
  currentPageNumber: number | null,
  cardsPerPage: number | null
}) => (
  <div className="flex flex-wrap justify-start pv4">
    {props.currentPageNumber && props.cardsPerPage
      ? paginationSlice(props.farmerCardList, props.currentPageNumber, props.cardsPerPage).map(
          (farmer: FarmerBrief) => <FarmerCard key={farmer.id} {...farmer} />
        )
      : props.farmerCardList.map((farmer: FarmerBrief) => <FarmerCard key={farmer.id} {...farmer} />)}
  </div>
);

export default FarmerCardList;
