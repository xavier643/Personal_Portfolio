import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../queries/users/getUsers';
import { DELETE_USER_MUTATION } from '../mutations/users/delete'
import { Container, Row, Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';

const UserList = () => {
  // state manage for modal visibility
  const [showModal, setShowModal] = useState(false);
  // state manage for selected user id
  const [selectedUser, setSelectedUser] = useState(null);
  // Limit the number of users displayed per page
  const [limit] = useState(5);
  // Keep track of the current page index
  const [pageIndex, setPageIndex] = useState(0);
  // Calculate the number of users to skip based on the current page index
  const skip = pageIndex * limit;
  // Calculate the number of users to skip based on the current page index
  const highestPageIndex = useRef(0);

  // Query to fetch users based on the limit and skip values
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { limit, skip },
  });

  // Additional query to check if there are more users beyond the current page
  const { data: moreUsersData, refetch: refetchMoreUsers } = useQuery(GET_USERS, {
    variables: { limit: 1, skip: skip + limit },
  });

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: Array.from({ length: highestPageIndex.current + 1 }, (_, index) => ({
      query: GET_USERS,
      variables: { limit, skip: index * limit },
    })),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.users;
  const hasMoreUsers = moreUsersData && moreUsersData.users.length > 0;

  const handleNext = () => {
    setPageIndex(pageIndex + 1);
    // Update the highestPageIndex if the current pageIndex is higher
    highestPageIndex.current = Math.max(highestPageIndex.current, pageIndex + 1);
  };

  const handlePrevious = () => {
    setPageIndex(pageIndex - 1);
  };

  // Function to show the modal
  const handleShowModal = (user) => {
    console.log("user", user);
    setSelectedUser(user);
    setShowModal(true);
  };

  // Function to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    await deleteUser({ variables: { id: selectedUser.id } });
    await refetchMoreUsers(); // Refetch to update hasMoreUsers
    setShowModal(false);
  }

  return (
    <Container>
      <Row>Dashboard</Row>
      <ListGroup>
        {users.map(user => (
          <ListGroupItem key={user.id} className="d-flex justify-content-between align-items-center">
            {user.username} - {user.email}
            <Button variant='danger' onClick={() => handleShowModal(user)}><span className="material-icons">delete</span></Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <Button onClick={handlePrevious} disabled={skip === 0}>
        Previous
      </Button>
      <Button onClick={handleNext} disabled={!hasMoreUsers}>
        Next
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the user: {selectedUser?.username}? This action is permanent.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
