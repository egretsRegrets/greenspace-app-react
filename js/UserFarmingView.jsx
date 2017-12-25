// @flow

import React from 'react';

const UserFarmingView = (props: { farmer: FarmerBrief }) => (
  <section>
    <code>{JSON.stringify(props.farmer)}</code>
  </section>
);

export default UserFarmingView;
