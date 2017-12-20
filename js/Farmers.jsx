// @flow

import React from 'react';
import FarmerCard from './FarmerCard';

const Farmers = (props: { farmers: Array<FarmerBrief> }) => (
  <section className="pv6 ph5">
    {/* delimit num per section by sepcific number, add margin to bottom of each section */}
    <div className="flex flex-wrap justify-between pv4">
      {props.farmers.map((farmer: FarmerBrief) => <FarmerCard key={farmer.id} {...farmer} />)}
    </div>
  </section>
);
export default Farmers;
