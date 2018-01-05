// @flow

import React from 'react';
import preload from '../data.json';
import GreenspaceCardList from './GreenspaceCardList';

const UserGreenspaceView = (props: { greenspaceOwner: GreenspaceOwnerBrief }) => {
  const ownedGreenspaces = preload.greenspaces.filter(
    (greenspace: Greenspace) =>
      typeof props.greenspaceOwner.ownedPropertyIDs !== 'undefined' &&
      props.greenspaceOwner.ownedPropertyIDs.includes(greenspace.id)
  );
  const lendingGreenspacesTitle = (
    <h3 className="mt5 mb0 f3 avenir near-black">{`Greenspaces ${props.greenspaceOwner.userName} is Lending`}</h3>
  );
  const lendingGreenspacesList = <GreenspaceCardList greenspaceCardList={ownedGreenspaces} />;
  let landownerParticipationInfo;
  let participationColor = 'green';
  if (props.greenspaceOwner.desiredLandOwnerParticipation) {
    if (props.greenspaceOwner.desiredLandOwnerParticipation === 'hands-off') {
      participationColor = 'near-white';
    } else if (props.greenspaceOwner.desiredLandOwnerParticipation === 'helping hand') {
      participationColor = 'near-black';
    }
  }
  if (props.greenspaceOwner.desiredLandOwnerParticipation) {
    landownerParticipationInfo = (
      <div>
        <h5 className="mb3 f5 avenir i">Farming Participation:</h5>
        <h5 className={`mt0 dib pv2 ph3 ba b--${participationColor} bw2 f5 avenir`}>
          {props.greenspaceOwner.desiredLandOwnerParticipation}
        </h5>
      </div>
    );
  }
  return (
    <section>
      <div className="ph5">
        {landownerParticipationInfo}
        <p className="mw8 lh-copy avenir">{props.greenspaceOwner.bio}</p>
        {ownedGreenspaces.length ? lendingGreenspacesTitle : null}
      </div>
      {ownedGreenspaces.length ? lendingGreenspacesList : null}
    </section>
  );
};

export default UserGreenspaceView;
