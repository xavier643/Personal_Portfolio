import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container>
      <Row>
        <Col>
          This is your dashboard, {user.name}!
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
