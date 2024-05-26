import UserList from './UserList';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headers/Header';

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  return (
    <Container className="mt-5">
      <Header user={user} />
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
