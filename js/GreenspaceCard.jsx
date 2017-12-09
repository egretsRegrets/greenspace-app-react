// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const GreenspaceCard = (props: Greenspace) => {
  let seekingFarmer;
  let spaceImages;
  let spaceMainImage;
  if (props.farmerDesired) {
    seekingFarmer = (
      <Link to="/" className="dib ph2 pv2 ba bw1 br-pill dim link no-underline light-red">
        Seeking Farmer
      </Link>
    );
  } else {
    seekingFarmer = (
      <Link to="/" className="dib ph2 pv2 ba bw1 br-pill dim link no-underline green">
        See The Farmers
      </Link>
    );
  }
  if (props.images) {
    spaceImages = props.images;
    spaceMainImage = (
      <img
        src={`/public/images/${spaceImages[0]}`}
        alt={`${props.name} greenspace thumbnail`}
        className="br3 br--top"
      />
    );
  } else {
    spaceMainImage = <p>No main image</p>;
  }
  return (
    <div className="w-25 mb3 pa3">
      <section className="bg-near-white br3">
        <div className="h4 overflow-hidden">{spaceMainImage}</div>
        <Link
          to={`/greenspace/${props.id}`}
          className="db w-75 center mt4 mb3 pv2 br-pill bg-green link dim tc f4 avenir b white no-underline"
        >
          See Greenspace
        </Link>
        <div className="ph3 pt0 pb2 tc">
          <h3 className="mv0 f4 lh-copy ttc avenir">{props.name}</h3>
          <p className="mt2 mb3 f5 lh-copy helvetica">{props.address}</p>
          <div className="flex ph1 avenir">
            <ul className="w-50 mt0 pl3 tl">
              {props.tags.map(tag => (
                <li key={Math.random()} className="mv1 ttc f6 dark-green">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="w-50 f7 tc">{seekingFarmer}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GreenspaceCard;
