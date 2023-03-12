import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export const PrivateRouter = ({ path, children }: RouteProps) => {
  const isLogin = true;

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
