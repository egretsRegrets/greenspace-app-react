// @flow

import React from 'react';
import GreenspaceCard from './GreenspaceCard';

const Greenspaces = (props: { greenspaces: Array<Greenspace> }) => (
  <section>
    {props.greenspaces.map((greenspace: Greenspace) => <GreenspaceCard {...greenspace} key={greenspace.id} />)}
  </section>
);

export default Greenspaces;
