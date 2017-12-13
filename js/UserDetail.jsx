// @flow

import React from 'react';

const UserDetail = (props: { user: User }) => (
  <section style={{ paddingTop: '96px' }}>
    <h1>{`User Detail Component for ${props.user.name}`}</h1>
  </section>
);

export default UserDetail;
