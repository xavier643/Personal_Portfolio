import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../mutations/users/login';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading: mutationLoading, error: mutationError }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      const { token, expiresIn } = data.login;
      localStorage.setItem('token', token);
      const expirationTime = Date.now() + expiresIn * 1000;
      localStorage.setItem('tokenExpiration', expirationTime);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={mutationLoading}>
              {mutationLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
            </Button>

            {mutationError && (
              <Alert variant="danger" className="mt-3">
                {mutationError.message}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
