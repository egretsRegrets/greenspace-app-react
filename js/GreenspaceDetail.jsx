// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const GreenspaceDetail = (props: { greenspace: Greenspace }) => {
  let mainBgImg;
  let seekingFarmer;
  if (props.greenspace.mainImage) {
    mainBgImg = (
      <div
        className="w-100 vh-75 bg-center"
        style={{
          backgroundImage: `url(/public/images/${props.greenspace.mainImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
    );
  }
  if (props.greenspace.farmerDesired) {
    seekingFarmer = (
      <Link to="/" className="dib mv4 ph3 pv2 ba bw1 br-pill dim link no-underline light-red">
        Seeking Farmer
      </Link>
    );
  } else {
    seekingFarmer = (
      <Link to="/" className="dib mv4 ph3 pv2 ba bw1 br-pill dim link no-underline green">
        See The Farmers
      </Link>
    );
  }
  return (
    <section style={{ paddingTop: '96px' }}>
      {mainBgImg}
      <article className="ph4">
        <header className="flex">
          <h1 className="mr4 f2 lh-copy avenir ttc black-70">{props.greenspace.name}</h1>
          <p style={{ paddingTop: '27px' }} className="mr4 f5 lh-copy avenir i b black-70">
            {props.greenspace.address}
          </p>
          {seekingFarmer}
        </header>
        <div className="ph6">
          <p className="mt0 f3 lh-copy baskerville black-70">{props.greenspace.description}</p>
        </div>
      </article>
      <code>{JSON.stringify(props.greenspace)}</code>
    </section>
  );
};

export default GreenspaceDetail;
