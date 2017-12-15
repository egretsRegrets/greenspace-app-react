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
      <section className="h-100 bg-near-white br3 shadow-5">
        <div className="h4 overflow-hidden">{spaceMainImage}</div>
        <Link
          to={`/greenspace/${props.id}`}
          className="db w-75 center mt4 mb3 pv2 br-pill bg-green link dim tc f4 avenir b white no-underline"
        >
          See Greenspace
        </Link>
        <div className="pt0 pb2 tc">
          <h3 className="mv0 ph3  f4 lh-copy ttc avenir">{props.name}</h3>
          <h5 className="mt2 mb3 ph3 f5 lh-title normal avenir">{props.address}</h5>
          <div className="bt b--black-10">
            <div className="flex mt4 mb2 ph4 avenir">
              <ul className="w-50 mt0 pl3 tl">
                {props.tags.map(tag => (
                  <li key={tag} className="mv1 ttc f6 dark-green">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="w-50 f7 tc">{seekingFarmer}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GreenspaceCard;
