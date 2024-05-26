import { Container, Row, Col, Button } from 'react-bootstrap';
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
      <Container>
        <Row className="mb-4">
          <Col xs={8}>
            <h1>Welcome {user.name}</h1>
          </Col>
          <Col xs={4} className="text-end">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Header;