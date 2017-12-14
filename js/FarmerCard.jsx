// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const FarmerCard = (props: FarmerCard) => (
  <div>
    <Link to={`/user/${props.id}`}>
      <h1>{props.userName}</h1>
    </Link>
  </div>
);

export default FarmerCard;
