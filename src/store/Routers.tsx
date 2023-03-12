import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from '@auth/Login';
import { Error404 } from '@page/Error404';
import { SingUp } from '@auth/SingUp';
import { Main } from '@main/Main';
import { Board } from '@board/Board';

import { PrivateRouter } from './PrivateRouter';

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
