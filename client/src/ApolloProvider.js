import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Link to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000', // Adjust if your GraphQL endpoint differs
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Create a provider component
const ApolloProvider = ({ children }) => (
  <Provider client={client}>
    {children}
  </Provider>
);

export default ApolloProvider;
