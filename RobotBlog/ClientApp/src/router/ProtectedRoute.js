import React, { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import NotFound from '../components/not-found/NotFound';

const ProtectedRoute = (props) => {
  const {
    roles,
    component,
    exact,
    path,
  } = props;

  const [loginResult] = useGlobal('loginResult');
  const toRenderComponent = (!roles || roles.includes(loginResult?.user.role))
    ? component
    : NotFound;

  return (
    <Route exact={exact} path={path} component={toRenderComponent} />
  );
};

ProtectedRoute.propTypes = PropTypes.shape({
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
}).isRequired;

export default ProtectedRoute;
