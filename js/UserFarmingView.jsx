// @flow

import React from 'react';
import preload from '../data.json';
import Greenspaces from './Greenspaces';

const UserFarmingView = (props: { farmer: FarmerBrief }) => {
  const farmingGreenspaces = preload.greenspaces.filter(
    (greenspace: Greenspace) =>
      typeof props.farmer.properties !== 'undefined' && props.farmer.properties.includes(greenspace.id)
  );
  return (
    <section>
      <h3 className="f3 avenir near-black pl5">Farming</h3>
      <Greenspaces greenspaces={farmingGreenspaces} />
    </section>
  );
};

export default UserFarmingView;
