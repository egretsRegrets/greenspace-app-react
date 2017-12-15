// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const FarmerCard = (props: FarmerBrief) => {
  let skillList1 = [];
  let skillList2 = [];
  if (props.skills) {
    if (props.skills.length > 1) {
      skillList1 = skillList1.concat(props.skills.slice(0, props.skills.length / 2 + 1));
      skillList2 = skillList2.concat(props.skills.slice(props.skills.length / 2 + 1));
    } else {
      skillList1 = skillList1.concat(props.skills);
    }
  }
  return (
    <div className="pb3 ba b--black-10 br3 tc" style={{ width: '23%', marginRight: '2%' }}>
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
        to={`/user/${props.id}`}
      >
        View Farmer
      </Link>

      <div className="w-100 mt3 ph3 bt b--black-10 ">
        <h4 className="mb0 pl3 tl f4 ttc avenir black-70">skills</h4>
        <hr className="mw4 ml3 mt1 mb0 bb bw1 b--black-05 tl" />
        <div className="flex justify-around">
          <ul className="mt2 pl1">
            {skillList1.map(skill => (
              <li key={skill} className="tl f6 lh-copy ttc helvetica b dark-green">
                {skill}
              </li>
            ))}
          </ul>
          <ul className="mt2 pl1">
            {skillList2.map(skill => (
              <li key={skill} className="tl f6 lh-copy ttc helvetica b dark-green">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FarmerCard;
