import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../queries/users/getUsers';
import { Container, Row, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const UserList = () => {
  const [limit] = useState(2);
  const [skip, setSkip] = useState(0);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { limit, skip },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.users;

  const handleNext = () => {
    setSkip(skip + limit);
  };

  const handlePrevious = () => {
    setSkip(skip - limit);
  };

  return (
    <Container>
      <Row>Dashboard</Row>
      <ListGroup>
        {users.map(user => (
          <ListGroupItem key={user.id}>
            {user.username} - {user.email}
          </ListGroupItem>
        ))}
      </ListGroup>
      <Button onClick={handlePrevious} disabled={skip === 0}>
        Previous
      </Button>
      <Button onClick={handleNext} disabled={users.length < limit}>
        Next
      </Button>
    </Container>
  );
};

export default UserList;
