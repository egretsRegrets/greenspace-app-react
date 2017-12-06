// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './Landing';

const FourOhFour = () => <h1>404 - Uh Oh Nothing at this address - 404</h1>;

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route component={FourOhFour} />
    </Switch>
  </div>
);

export default App;
