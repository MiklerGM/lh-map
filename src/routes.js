import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Main from './pages/Main';
import Result from './pages/Result';
import Map from './containers/Map';

const AppRouter = () => (
  <div>
    <Map />
    <Switch>
      <Route exact path='/' render={() => <Main />} />
      <Route path='/:id' component={Result} />
    </Switch>
  </div>
);

export default AppRouter;
