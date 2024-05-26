import UserList from './UserList';
import { Container, Row, Col, Button} from 'react-bootstrap';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  return (
    <Container className="mt-5">
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
      <Row>
        <Col>
          {user.role === 'admin' 
          ? ( <UserList />)
          : (
              <h2>Users do not have access to user list</h2>
            )
          }
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
