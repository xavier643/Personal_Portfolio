import PropTypes from 'prop-types';

const Header = ({user}) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header>
      <div className='welcome-text'>Welcome {user.name}</div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Header;