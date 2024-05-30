import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../queries/users/getUsers';
import { DELETE_USER_MUTATION } from '../mutations/users/delete'
import { CREATE_USER_MUTATION } from '../mutations/users/create'
import { Container, Row, Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';

const UserList = () => {
  // form data for creating a new user
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    role: '',
  });
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

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
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

  const handleAdd = async () => {
    await createUser({ variables: formData });
    await refetchMoreUsers(); // Refetch to update hasMoreUsers
    setShowModal(false);
  }

  const createModal = () => {
    if (selectedUser) {
      return (
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
      );
    } else {
      return (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <input type="text" className="form-control" id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="primary" onClick={handleAdd}>Add User</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };
  

  return (
    <Container>
      <Row>User List</Row>
      <Button onClick={() => handleShowModal(null)}>Add User</Button>
      <ListGroup id='user-list'>
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
      {createModal()}
    </Container>
  );
};

export default UserList;
