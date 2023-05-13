import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { authSelector } from './selectors';

export const PrivateRouter = ({ path, children }: RouteProps) => {
  const isLogin = useSelector(authSelector);

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};

PrivateRouter.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
