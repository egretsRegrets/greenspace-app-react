// @flow

import React from 'react';
import GreenspaceCardList from './GreenspaceCardList';

const GreenSpaces = (props: { greenSpaces: Array<Greenspace> }) => (
  <section>
    <GreenspaceCardList greenspaceCardList={props.greenSpaces} />
  </section>
);

export default GreenSpaces;
