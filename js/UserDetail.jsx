// @flow

import React from 'react';

const UserDetail = (props: { user: User }) => {
  let farmingGsPhrase;
  let volunteeringGsPhrase;
  if (props.user.farmingPropertyIDs) {
    if (props.user.farmingPropertyIDs.length > 1) {
      farmingGsPhrase = `farming ${props.user.farmingPropertyIDs.length} greenspaces`;
    } else {
      farmingGsPhrase = `farming 1 greenspace`;
    }
  }
  if (props.user.ownedPropertyIDs) {
    if (props.user.ownedPropertyIDs.length > 1) {
      volunteeringGsPhrase = `volunteering ${props.user.ownedPropertyIDs.length} greenspaces`;
    } else {
      volunteeringGsPhrase = `volunteering 1 greenspace`;
    }
  }

  const gsFarmingNum = (
    <h5 className="mh3 mt0">{props.user.farmingPropertyIDs ? farmingGsPhrase : 'farming 0 greenspaces'}</h5>
  );
  const gsVolunteeringNum = (
    <h5 className="mh3 mt0">{props.user.ownedPropertyIDs ? volunteeringGsPhrase : 'volunteering 0 greenspaces'}</h5>
  );
  const selectedViewHR = <hr className="green mb0 mt2 bw2 bl-0-l bt-0-l" />;
  const farmerProfileSelect = (
    <div>
      <button className="mh3 bn bg-white avenir pointer">Farming</button>
      {selectedViewHR}
    </div>
  );
  const greenspacesProfileSelect = (
    <div>
      <button className="mh3 bn bg-white avenir pointer">Greenspaces</button>
    </div>
  );

  return (
    <section style={{ paddingTop: '96px' }}>
      <header>
        <div className="bg-near-white tc pb3 pt5">
          <div
            className="center bg-center cover bg-green br-100"
            style={{
              backgroundImage: `url(/public/images/profile_images/${props.user.profileImage})`,
              width: '165px',
              height: '165px'
            }}
          />
          <h2 className="f2 avenir ttc dark-green lh-title mb2 mt3">{props.user.userName}</h2>
          <h5 className="f5 avenir ttc silver fw4 lh-title mt3 mb0">{props.user.community}</h5>
          <div className="mt3 f5 avenir near-black lh-title flex justify-center">
            {props.user.farmer ? gsFarmingNum : null}
            {props.user.landOwner ? gsVolunteeringNum : null}
          </div>
        </div>
        <div className="flex justify-center pt3 pb0 mb4">
          {props.user.farmer ? farmerProfileSelect : null}
          {props.user.landOwner ? greenspacesProfileSelect : null}
        </div>
        <code>{JSON.stringify(props.user)}</code>
      </header>
    </section>
  );
};

export default UserDetail;
