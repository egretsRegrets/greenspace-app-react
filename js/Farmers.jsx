// @flow

import React from 'react';
import FarmerCard from './FarmerCard';

const Farmers = (props: Array<FarmerBrief>) => {
  props.map((farmer: FarmerBrief) => <FarmerCard key={farmer.id} {...farmer} />);
};

export default Farmers;
