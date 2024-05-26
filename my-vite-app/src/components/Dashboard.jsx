import { useQuery } from '@apollo/client';
import { GET_USERS } from '../queries/users/getUsers';
import { Container, Row, Col, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Spinner animation="border" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Alert variant="danger">
              Error: {error.message}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1>Dashboard</h1>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Users</h2>
          <ListGroup>
            {data.users.map(user => (
              <ListGroup.Item key={user.id}>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
