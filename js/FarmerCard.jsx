// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const FarmerCard = (props: FarmerBrief) => (
  <div className="w-25 pb4 ba b--black-10 br3 tc">
    <header className="w-100 relative">
      <div className="w-100 absolute top-0 br3 br--top bg-near-white z-0" style={{ height: '90px' }} />
      <div
        className="dib auto mt4 relative br-100 bg-center cover"
        style={{
          backgroundImage: `url(/public/images/profile_images/${props.profileImage})`,
          height: '100px',
          width: '100px'
        }}
      />
    </header>
    <h1 className="mv1 f3 lh-title ttc avenir ">{props.userName}</h1>
    <Link className="dib auto ph3 pv2 ba br-pill dark-green f7 avenir b no-underline link dim" to={`/user/${props.id}`}>
      View Farmer
    </Link>
  </div>
);

export default FarmerCard;
