// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import preload from '../data.json';
import FarmerCard from './FarmerCard';

const GreenspaceDetail = (props: { greenspace: Greenspace }) => {
  const greenspaceOwner: User = preload.users.find((user: User) => user.id === props.greenspace.landownerID);
  const farmers = preload.users
    .filter((user: User) => user.farmer)
    .filter(
      (user: User) =>
        typeof user.farmingPropertyIDs !== 'undefined' && user.farmingPropertyIDs.includes(props.greenspace.id)
    )
    .map((user: User) =>
      Object.assign(
        {},
        {
          userName: user.userName,
          id: user.id,
          profileImage: user.profileImage,
          community: user.community,
          experience: user.farmingExperienceLevel,
          skills: user.farmingSkills
        }
      )
    );
  let mainBgImg;
  let seekingFarmer;

  if (props.greenspace.mainImage) {
    mainBgImg = (
      <div
        className="w-100 vh-75 bg-center cover"
        style={{
          backgroundImage: `url(/public/images/${props.greenspace.mainImage})`,
          backgroundRepeat: 'no-repeat'
        }}
      />
    );
  }

  if (props.greenspace.farmerDesired) {
    seekingFarmer = (
      <Link to="/" className="dib mv4 ph3 pv2 ba bw1 br-pill dim link no-underline light-red">
        Become a Farmer
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
        <header className="flex justify-between">
          <h1 className="mr3 f2 lh-copy avenir ttc black-70">{props.greenspace.name}</h1>
          <p style={{ paddingTop: '20px' }} className="mr4 f4 lh-copy avenir i b black-70">
            {props.greenspace.address}
          </p>
          <div className="mr4">{seekingFarmer}</div>
          <Link className="no-underline link dim" to={`/user/${greenspaceOwner.id}`}>
            <div className="flex">
              <p className="mr3 f5 tr lh-title avenir ttc i b black-70" style={{ paddingTop: '12px' }}>
                {`${greenspaceOwner.userName}'s`}
                <br />
                Greenspace
              </p>
              <div
                className="mt3 br-100 bg-center cover"
                style={{
                  backgroundImage: `url(/public/images/profile_images/${greenspaceOwner.profileImage})`,
                  height: '54px',
                  width: '54px'
                }}
              />
            </div>
          </Link>
        </header>

        <div className="ph6">
          <p className="mt0 f3 lh-copy baskerville black-70">{props.greenspace.description}</p>
        </div>

        <div>{farmers.map((farmer: FarmerBrief) => <FarmerCard key={farmer.id} {...farmer} />)}</div>
      </article>
      <code>{JSON.stringify(props.greenspace)}</code>
    </section>
  );
};

export default GreenspaceDetail;
