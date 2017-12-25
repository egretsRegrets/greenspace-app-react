// @flow

import React from 'react';
import preload from '../data.json';
import Greenspaces from './Greenspaces';

const UserGreenspaceView = (props: { greenspaceOwner: GreenspaceOwnerBrief }) => {
  const ownedGreenspaces = preload.greenspaces.filter(
    (greenspace: Greenspace) =>
      typeof props.greenspaceOwner.ownedPropertyIDs !== 'undefined' &&
      props.greenspaceOwner.ownedPropertyIDs.includes(greenspace.id)
  );
  return (
    <section>
      <h3 className="f3 avenir near-black pl5">Greenspace</h3>
      <Greenspaces greenspaces={ownedGreenspaces} />
    </section>
  );
};

export default UserGreenspaceView;
