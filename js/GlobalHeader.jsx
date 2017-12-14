// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import type { MapStateToProps } from 'react-redux';
import preload from '../data.json';

const GlobalHeader = (props: { selectedUser: User }) => (
  <header className="fixed w-100 flex items-center h3 pa4 ba bw4 bg-green green">
    <nav className="w-50 flex items-center h3">
      <Link className="mr3 f2 white avenir no-underline b" to="/">
        Greenspace
      </Link>
      <Link className="mr3 pt2 f4 white avenir no-underline b dim" to="/">
        Farmers
      </Link>
      <Link className="pt2 f4 white avenir no-underline b dim" to="/greenspaces">
        Spaces
      </Link>
    </nav>
    <nav className="w-50 flex flex-row-reverse items-center h3">
      <Link
        className="pt2 f4 white avenir ttc no-underline b dim"
        to={props.selectedUser ? `/user/${props.selectedUser.id}` : '/'}
      >
        {props.selectedUser ? props.selectedUser.userName : 'Login'}
      </Link>
    </nav>
  </header>
);
const mapStateToProps: MapStateToProps<*, *, *> = state => {
  const selectedUser = preload.users.find((user: User) => user.id === state.user.id);
  return { selectedUser };
};

export default connect(mapStateToProps)(GlobalHeader);
