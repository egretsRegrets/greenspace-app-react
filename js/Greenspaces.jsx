// @flow

import React from 'react';
import GreenspaceCard from './GreenspaceCard';

const Greenspaces = (props: { greenspaces: Array<Greenspace> }) => (
  <section className="flex flex-wrap justify-between pv4">
    {props.greenspaces.map((greenspace: Greenspace) => <GreenspaceCard {...greenspace} key={greenspace.id} />)}
  </section>
);

export default Greenspaces;
