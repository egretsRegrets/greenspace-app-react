// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './Landing';
import GlobalHeader from './GlobalHeader';
import Greenspaces from './Greenspaces';
import preload from '../data.json';

const FourOhFour = () => <h1>404 - Uh Oh Nothing at this address - 404</h1>;

const App = () => (
  <Provider store={store}>
    <div className="app">
      <GlobalHeader />
      <div className="pv6 ph5">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            path="/greenspaces"
            component={props => <Greenspaces greenspaces={preload.greenspaces} {...props} />}
          />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </div>
  </Provider>
);

export default App;
