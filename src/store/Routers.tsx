import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PrivateRouter } from './PrivateRouter';
import { Login } from '../pages/Auth/Login';
import { SingUp } from '../pages/Auth/SingUp';
import { Board } from '../pages/Board/Board';
import { Error404 } from '../pages/Error404';
import { Main } from '../pages/Main/Main';

export const Routers = () => (
  <Switch>
    <PrivateRouter exact path="/">
      <Redirect to="/workspace" />
    </PrivateRouter>
    <PrivateRouter exact path="/:workspace(workspace|personal|team)">
      <Main />
    </PrivateRouter>
    <PrivateRouter path="/board/:id">
      <Board />
    </PrivateRouter>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route path="/singup">
      <SingUp />
    </Route>
    <Route path="*">
      <Error404 />
    </Route>
  </Switch>
);
