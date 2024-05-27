import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const isValidToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload && payload.exp && Date.now() < payload.exp * 1000;
    } catch (e) {
      return false;
    }
  };

  if (!token || !isValidToken(token) || !user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default ProtectedRoute;
