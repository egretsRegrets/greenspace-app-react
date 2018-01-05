// @flow

import React from 'react';
import preload from '../data.json';
import GreenspaceCardList from './GreenspaceCardList';

const UserFarmingView = (props: { farmer: FarmerBrief }) => {
  const farmingGreenspaces = preload.greenspaces.filter(
    (greenspace: Greenspace) =>
      typeof props.farmer.properties !== 'undefined' && props.farmer.properties.includes(greenspace.id)
  );
  const farmingGreenspacesTitle = (
    <h3 className="mt5 mb0 f3 avenir near-black">{`Greenspaces ${props.farmer.userName} is Farming`}</h3>
  );
  const farmingGreenspacesList = <GreenspaceCardList greenspaceCardList={farmingGreenspaces} />;
  let farmingSkillList;
  let experienceOutlineColor: string;
  if (props.farmer.skills) {
    farmingSkillList = (
      <div className="avenir">
        <h5 className="mb2 f5 i">Farming Skills:</h5>
        <ul className="pb3 pl0">
          {props.farmer.skills.map((skill: farmingSkills) => (
            <li key={skill} className="dib pv2 ph3 bg-green white mr3">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (props.farmer.experience === 'novice') {
    experienceOutlineColor = 'near-white';
  } else if (props.farmer.experience === 'intermediate') {
    experienceOutlineColor = 'near-black';
  } else {
    experienceOutlineColor = 'green';
  }
  return (
    <section>
      <div className="ph5">
        <h4 className={`mb2 pv2 ph3 dib ba bw2 b--${experienceOutlineColor} avenir f4 ttc`}>{`${
          props.farmer.experience
        } farmer`}</h4>
        {farmingSkillList}
        <p className="mw8 lh-copy avenir">{props.farmer.bio}</p>
        {farmingGreenspaces.length ? farmingGreenspacesTitle : null}
      </div>
      {farmingGreenspaces.length ? farmingGreenspacesList : null}
    </section>
  );
};

export default UserFarmingView;
