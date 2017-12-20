// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';
import preload from '../data.json';
import FarmerCard from './FarmerCard';
import { scrollToElem, easings } from './utils';

// $FlowFixMe
class GreenspaceDetail extends Component {
  constructor() {
    super();

    this.scrollToFarmers = (event: SyntheticEvent<*>) =>
      scrollToElem(this.farmersScrollTarget, 700, easings.cubicOut, event);
  }
  componentDidMount() {
    if (this.props.history.location.hash === '#farmers') {
      scrollToElem(this.farmersScrollTarget, 700, easings.cubicOut);
    }
  }

  props: { greenspace: Greenspace, history: RouterHistory };

  farmersScrollTarget: HTMLDivElement;
  becomeFarmerScrollTarget: HTMLDivElement;
  scrollToFarmers: Function;
  scrollToBecome: Function;

  render() {
    let mainBgImg;
    let seekingFarmer;
    if (this.props.greenspace.mainImage) {
      mainBgImg = (
        <div
          className="w-100 vh-75 bg-center cover"
          style={{
            backgroundImage: `url(/public/images/${this.props.greenspace.mainImage})`,
            backgroundRepeat: 'no-repeat'
          }}
        />
      );
    }
    if (this.props.greenspace.farmerDesired) {
      seekingFarmer = (
        <Link to="/" className="dib mv4 ph3 pv2 ba bw1 br-pill dim link no-underline light-red">
          Become a Farmer
        </Link>
      );
    } else {
      seekingFarmer = (
        <button
          onClick={this.scrollToFarmers}
          className="dib mv4 ph3 pv2 ba b--green bw1 br-pill f6 dim pointer link no-underline avenir green"
        >
          See The Farmers
        </button>
      );
    }
    const greenspaceOwner: User = preload.users.find((user: User) => user.id === this.props.greenspace.landownerID);
    const farmers = preload.users
      .filter((user: User) => user.farmer)
      .filter(
        (user: User) =>
          typeof user.farmingPropertyIDs !== 'undefined' && user.farmingPropertyIDs.includes(this.props.greenspace.id)
      )
      .map((user: User) =>
        Object.assign(
          {},
          {
            userName: user.userName,
            id: user.id,
            bio: user.bio,
            profileImage: user.profileImage,
            community: user.community,
            experience: user.farmingExperienceLevel,
            skills: user.farmingSkills
          }
        )
      );

    const farmersSection = (
      <div
        // $FlowFixMe
        ref={(target: HTMLDivElement) => {
          this.farmersScrollTarget = target;
        }}
        className="pa5"
        id="farmersSection"
      >
        <h1 className="mr3 f2 lh-title avenir black-70">The Farmers</h1>
        <div className="flex flex-wrap justify-start">
          {farmers.map((farmer: FarmerBrief) => <FarmerCard key={farmer.id} {...farmer} />)}
        </div>
      </div>
    );

    const becomeFarmerSection = (
      <div
        // $FlowFixMe
        ref={(target: HTMLDivElement) => {
          this.becomeFarmerScrollTarget = target;
        }}
        className="mt5 bg-near-white"
      >
        <div className="dt-ns w-100 ph5 pv5">
          <div className="dtc-ns w-50 v-mid">
            <h3 className="f3 lh-title avenir ttc light-red">{this.props.greenspace.name} needs a farmer.</h3>
            <p className="lh-copy f5 avenir">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sapien odio. Quisque ut risus sed risus
              pulvinar pharetra vitae venenatis sem. Vestibulum sit amet elementum erat. Sed faucibus, arcu vitae
              egestas rutrum, erat ante gravida massa, sit amet hendrerit est lacus at leo.
            </p>
          </div>
          <div className="dtc-ns w-50 v-mid tc">
            <Link to="/" className="w-75 pv3 dib f5 avenir bg-light-red br2 white tc link dim no-underline">
              Become a Farmer
            </Link>
          </div>
        </div>
      </div>
    );

    return (
      <section className="mb5" style={{ paddingTop: '96px' }}>
        {mainBgImg}

        <article className="ph4">
          <header className="flex justify-between">
            <h1 className="mr3 f2 lh-copy avenir ttc black-70">{this.props.greenspace.name}</h1>
            <p style={{ paddingTop: '20px' }} className="mr4 f4 lh-copy avenir i b black-70">
              {this.props.greenspace.address}
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

          <div className="pt5 ph6">
            <div>
              <ul className="pl0 list">
                {this.props.greenspace.tags.map(tag => (
                  <li className="mr3 dib lh-copy f5 ttc b i green avenir" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
              <hr className="mw6 ml0 mt1 mb3 bb bw1 b--black-10 tl" />
            </div>
            <p className="mv0 f3 lh-copy baskerville black-70">{this.props.greenspace.description}</p>
          </div>

          <div className="ph4 w-100 flex ml2 mt6 flex-wrap justify-start">
            {this.props.greenspace.images
              ? this.props.greenspace.images.map(image => (
                  <div className="h5 w-25 pr3 mb3 grow" key={image}>
                    <div className="h5 bg-center cover" style={{ backgroundImage: `url(/public/images/${image})` }} />
                  </div>
                ))
              : null}
          </div>
        </article>

        {this.props.greenspace.farmerDesired ? becomeFarmerSection : null}
        {farmers.length ? farmersSection : null}
      </section>
    );
  }
}

export default GreenspaceDetail;
