// @flow

// use clickHandler on profileSelects to change this.state.currentView
// use this.state.currentView to decide where selectedViewHR is displayed

import React, { Component } from 'react';

// $FlowFixMe
class UserDetail extends Component {
  constructor() {
    super();
    // $FlowFixMe
    this.state = { currentView: '' };
  }

  componentWillMount() {
    if (this.props.profileView) {
      // $FlowFixMe
      this.setState({ currentView: this.props.profileView });
    } else if (this.props.user.farmer && !this.props.user.landOwner) {
      // $FlowFixMe
      this.setState({ currentView: 'farming' });
    } else if (this.props.user.landOwner && !this.props.user.farmer) {
      // $FlowFixMe
      this.setState({ currentView: 'greenspaces' });
    } else {
      // default
      // $FlowFixMe
      this.setState({ currentView: 'farming' });
    }
  }

  props: { user: User, profileView: null | 'farming' | 'greenspaces' };

  changeProfileView = (event: SyntheticEvent<*>) =>
    // $FlowFixMe
    this.setState({ currentView: event.target.innerHTML.toLowerCase() });

  render() {
    let farmingGsPhrase;
    let volunteeringGsPhrase;
    if (this.props.user.farmingPropertyIDs) {
      if (this.props.user.farmingPropertyIDs.length > 1) {
        farmingGsPhrase = `farming ${this.props.user.farmingPropertyIDs.length} greenspaces`;
      } else {
        farmingGsPhrase = `farming 1 greenspace`;
      }
    }
    if (this.props.user.ownedPropertyIDs) {
      if (this.props.user.ownedPropertyIDs.length > 1) {
        volunteeringGsPhrase = `volunteering ${this.props.user.ownedPropertyIDs.length} greenspaces`;
      } else {
        volunteeringGsPhrase = `volunteering 1 greenspace`;
      }
    }

    const gsFarmingNum = (
      <h5 className="mh3 mt0">{this.props.user.farmingPropertyIDs ? farmingGsPhrase : 'farming 0 greenspaces'}</h5>
    );
    const gsVolunteeringNum = (
      <h5 className="mh3 mt0">
        {this.props.user.ownedPropertyIDs ? volunteeringGsPhrase : 'volunteering 0 greenspaces'}
      </h5>
    );
    const selectedViewHR = <hr className="green mb0 mt2 bw2 bl-0-l bt-0-l" />;
    const farmerProfileSelect = (
      <div className="ph2">
        <button onClick={this.changeProfileView} className="mh3 bn bg-white avenir pointer">
          Farming
        </button>
        {// $FlowFixMe
        this.state.currentView === 'farming' ? selectedViewHR : null}
      </div>
    );
    const greenspacesProfileSelect = (
      <div className="ph2">
        <button onClick={this.changeProfileView} className="mh3 bn bg-white avenir pointer">
          Greenspaces
        </button>
        {// $FlowFixMe
        this.state.currentView === 'greenspaces' ? selectedViewHR : null}
      </div>
    );

    return (
      <section style={{ paddingTop: '96px' }}>
        <header>
          <div className="bg-near-white tc pb3 pt5">
            <div
              className="center bg-center cover bg-green br-100"
              style={{
                backgroundImage: `url(/public/images/profile_images/${this.props.user.profileImage})`,
                width: '165px',
                height: '165px'
              }}
            />
            <h2 className="f2 avenir ttc dark-green lh-title mb2 mt3">{this.props.user.userName}</h2>
            <h5 className="f5 avenir ttc silver fw4 lh-title mt3 mb0">{this.props.user.community}</h5>
            <div className="mt3 f5 avenir near-black lh-title flex justify-center">
              {this.props.user.farmer ? gsFarmingNum : null}
              {this.props.user.landOwner ? gsVolunteeringNum : null}
            </div>
          </div>
          <div className="flex justify-center pt3 pb0 mb4">
            {this.props.user.farmer ? farmerProfileSelect : null}
            {this.props.user.landOwner ? greenspacesProfileSelect : null}
          </div>
          <code>{JSON.stringify(this.props.user)}</code>
        </header>
      </section>
    );
  }
}

export default UserDetail;
