// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const FarmerCard = (props: FarmerBrief) => {
  let skillCol1 = [];
  let skillCol2 = [];
  if (props.skills) {
    if (props.skills.length > 1) {
      // skill distribution to columns, check if length is even
      if (props.skills.length % 2 === 0) {
        skillCol1 = skillCol1.concat(props.skills.slice(0, props.skills.length / 2));
        // $FlowFixMe
        skillCol2 = skillCol2.concat(props.skills.slice(props.skills.length / 2));
      } else {
        // if odd we want the column with the highest number of items to be skillCol1
        // $FlowFixMe
        skillCol1 = skillCol1.concat(props.skills.slice(0, Math.floor(props.skills.length / 2) + 1));
        // $FlowFixMe
        skillCol2 = skillCol2.concat(props.skills.slice(Math.floor(props.skills.length / 2) + 1));
      }
    } else {
      skillCol1 = skillCol1.concat(props.skills);
    }
  }

  let shortBio;
  if (!props.skills) {
    // If we don't have skills we'll provide the bio instead but we just want an abstract,
    // so we take the first 101 chars, cut off the last - to get rid of any cut off words,
    shortBio = props.bio
      .substr(0, 101)
      .split(' ')
      .slice(0, -1)
      .join(' ');
    // And if a period is the last character we want to delete it, because we're going to have an ellipsis
    // at the end of our string variable.
    if (shortBio.lastIndexOf('.') === shortBio.length - 1) {
      shortBio = shortBio.substr(0, shortBio.length - 1);
    }
  }

  const skillList = (
    <div>
      <div className="flex justify-between ph2">
        <ul className="mt3 pl0 list">
          {skillCol1.map(skill => (
            <li key={skill} className="tl f7 lh-copy ttc helvetica b dark-green">
              {skill}
            </li>
          ))}
        </ul>
        <ul className="mt3 pl0 list">
          {skillCol2.map(skill => (
            <li key={skill} className="tl f7 lh-copy ttc helvetica b dark-green">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  const bio = (
    <div className="ph2 pt3">
      <p className="mt0 tl lh-copy f6 avenir">{shortBio}...</p>
    </div>
  );

  return (
    <div
      className="pb3 ba b--black-05 br3 grow shadow-5 tc"
      style={{ width: '23%', marginRight: '2%', marginBottom: '48px' }}
    >
      <header className="w-100 mb3 relative">
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
      <h3 className="mt1 mb2 f3 lh-title ttc avenir ">{props.userName}</h3>
      <h5 className="mt2 mb3 f5 lh-title ttc avenir black-70">{`${props.experience} farmer`}</h5>
      <Link
        className="dib auto ph3 pv2 ba br-pill dark-green f7 avenir b no-underline link dim"
        to={`/user/${props.id}/#farming`}
      >
        View Farmer
      </Link>

      <div className="w-100 mt3 ph3 bt b--black-10 ">
        <h4 className="mb0 mt3 pl2 tl f4 ttc avenir black-70">{props.skills ? 'skills' : 'about'}</h4>
        <hr className="mw4 ml2 mt1 mb0 bb bw1 b--black-05 tl" />
        {props.skills ? skillList : bio}
      </div>
    </div>
  );
};

export default FarmerCard;
