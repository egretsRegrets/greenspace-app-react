// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import preload from '../data.json';
import Landing from './Landing';
import GlobalHeader from './GlobalHeader';
import Greenspaces from './Greenspaces';
import GreenspaceDetail from './GreenspaceDetail';
import UserDetail from './UserDetail';

const FourOhFour = () => <h1>404 - Uh Oh Nothing at this address - 404</h1>;

const App = () => (
  <Provider store={store}>
    <div className="app">
      <GlobalHeader />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/greenspaces" component={props => <Greenspaces greenspaces={preload.greenspaces} {...props} />} />
        <Route
          path="/greenspace/:id"
          component={(props: { match: Match }) => {
            const selectedGreenspace = preload.greenspaces.find(
              (greenspace: Greenspace) => greenspace.id === props.match.params.id
            );
            return <GreenspaceDetail greenspace={selectedGreenspace} {...props} />;
          }}
        />
        <Route
          path="/user/:id"
          component={(props: { match: Match }) => {
            const selectedUser = preload.users.find((user: User) => user.id === props.match.params.id);
            return <UserDetail user={selectedUser} {...props} />;
          }}
        />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </Provider>
);

export default App;
