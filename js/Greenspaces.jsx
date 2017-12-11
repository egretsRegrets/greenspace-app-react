// @flow

import React from 'react';
import GreenspaceCard from './GreenspaceCard';

const Greenspaces = (props: { greenspaces: Array<Greenspace> }) => (
  <div className="pv6 ph5">
    <section className="flex flex-wrap justify-between pv4">
      {props.greenspaces.map((greenspace: Greenspace) => <GreenspaceCard {...greenspace} key={greenspace.id} />)}
    </section>
  </div>
);

export default Greenspaces;
