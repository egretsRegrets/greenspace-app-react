// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const GreenspaceCard = (props: Greenspace) => {
  let seekingFarmer;
  let spaceImages;
  let spaceMainImage;
  if (props.farmerDesired) {
    seekingFarmer = <p>Seeking Farmer</p>;
  } else {
    seekingFarmer = <p>See The Farmers</p>;
  }
  if (props.images) {
    spaceImages = props.images;
    spaceMainImage = <img src={`/public/images/${spaceImages[0]}`} alt={`${props.name} greenspace`} />;
  } else {
    spaceMainImage = <p>No main image</p>;
  }
  return (
    <Link to={`/greenspace/${props.id}`}>
      <div>
        {spaceMainImage}
        <div>
          <h3>{props.name}</h3>
          <p>{props.address}</p>
          {seekingFarmer}
          <ul>{props.tags.forEach(tag => <p>{tag}</p>)}</ul>
        </div>
      </div>
    </Link>
  );
};

export default GreenspaceCard;
