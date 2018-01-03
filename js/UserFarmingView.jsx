// @flow

import React from 'react';
import preload from '../data.json';
import Greenspaces from './Greenspaces';

const UserFarmingView = (props: { farmer: FarmerBrief }) => {
  const farmingGreenspaces = preload.greenspaces.filter(
    (greenspace: Greenspace) =>
      typeof props.farmer.properties !== 'undefined' && props.farmer.properties.includes(greenspace.id)
  );
  const farmingGreenspacesTitle = (
    <h3 className="mt5 mb0 f3 avenir near-black">{`Greenspaces ${props.farmer.userName} is Farming`}</h3>
  );
  const farmingGreenspacesList = <Greenspaces greenspaces={farmingGreenspaces} />;
  let farmingSkillList;
  if (props.farmer.skills) {
    farmingSkillList = (
      <div>
        <h5>Farming Skills:</h5>
        {props.farmer.skills.map((skill: string) => <li key={skill}>{skill}</li>)}
      </div>
    );
  }
  return (
    <section>
      <div className="pl5">
        <h4 className="avenir f4 ttc">{`${props.farmer.experience} farmer`}</h4>
        {farmingSkillList}
        <p className="lh-copy avenir">{props.farmer.bio}</p>
        {farmingGreenspaces.length ? farmingGreenspacesTitle : null}
      </div>
      {farmingGreenspaces.length ? farmingGreenspacesList : null}
      <code>{JSON.stringify(props.farmer)}</code>
    </section>
  );
};

export default UserFarmingView;
