// @flow

import React from 'react';
import Greenspaces from './Greenspaces';

const Spaces = (props: { spaces: Array<Greenspace> }) => (
  <section>
    <Greenspaces greenspaces={props.spaces} />
  </section>
);

export default Spaces;
