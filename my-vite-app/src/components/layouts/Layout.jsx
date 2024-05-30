import { Container, Row, Col } from 'react-bootstrap';
import Header from '../headers/Header';
import SidePanel from '../navigation/SidePanel';
import { Outlet } from 'react-router-dom';
// import '../../css/Layout.css'

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <Container fluid>
      <Row>
        <Header user={user} />
      </Row>
      <Row>
        <Col xs={3} id="sidebar">
          <SidePanel />
        </Col>
        <Col xs={9} id="content">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
