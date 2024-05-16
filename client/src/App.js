// src/App.js
import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './queries/users/getUsers';
import { GET_PROTECTED } from './queries/getProtected';
import Login from './components/Login';

function App() {
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);
  const { loading: protectedLoading, error: protectedError, data: protectedData } = useQuery(GET_PROTECTED);

  // this use effect will detect when the protected data has changed and will in turn cause the token to update based on what was pulled. This can be tweaked in the future to ensure that token is regularly being refreshed due to the fact I want tokens to time out and at the time of this comment being made the backend sets it at 3 minutes.
  useEffect(() => {
    if (protectedData && protectedData.protectedData && protectedData.protectedData.token) {
      localStorage.setItem('token', protectedData.protectedData.token);
    }
  }, [protectedData]);

  if (usersLoading || protectedLoading) return <p>Loading...</p>;

  if (usersError) {
    console.log(usersError);
    return <p>Error loading user data!</p>;
  }

  if (protectedError) {
    return (
      <div>
        <p>Error loading protected data: {protectedError.message}</p>
        <Login />
      </div>
    );
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {usersData.users.map((user) => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>
      <p>{protectedData.protectedData.message}</p>
    </div>
  );
}

export default App;
