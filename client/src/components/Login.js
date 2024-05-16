// src/components/Login.js
import React, { useState } from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import { GET_PROTECTED } from '../queries/getProtected';

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const client = useApolloClient();  // Get Apollo Client instance
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    // the on completed here sets the token and also triggers refetching of the query that app is currently running off of to decide if the login screen shows or not.
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      client.refetchQueries({
        include: [GET_PROTECTED]
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { username, password } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Login;
