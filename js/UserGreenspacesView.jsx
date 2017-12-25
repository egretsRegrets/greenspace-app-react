// @flow
import React from 'react';

const UserGreenspaceView = (props: { greenspaceOwner: GreenspaceOwnerBrief }) => (
  <div>
    <code>{JSON.stringify(props.greenspaceOwner)}</code>
  </div>
);

export default UserGreenspaceView;
