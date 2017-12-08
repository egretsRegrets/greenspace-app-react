// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const GreenspaceCard = (props: {
  id: string,
  image: string,
  name: string,
  address: string,
  tags: Array<string>,
  seekingFarmer: boolean
}) => {
  let seekingFarmer;
  if (props.seekingFarmer) {
    seekingFarmer = <p>Seeking Farmer</p>;
  } else {
    seekingFarmer = <p>See The Farmers</p>;
  }
  return (
    <Link to={`/greenspace/:${props.id}`}>
      <div>
        <img src={`/public/images/${props.image}`} alt={`${props.name} greenspace`} />
        <div>
          <h3>{props.name}</h3>
          <p>{props.address}</p>
          <p>{seekingFarmer}</p>
          <ul>{props.tags.forEach(tag => <p>{tag}</p>)}</ul>
        </div>
      </div>
    </Link>
  );
};

export default GreenspaceCard;
