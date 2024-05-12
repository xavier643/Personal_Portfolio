import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
} from '@apollo/client';

// Link to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000', // Adjust if your GraphQL endpoint differs
});

// Create the Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Create a provider component
const ApolloProvider = ({ children }) => (
  <Provider client={client}>
    {children}
  </Provider>
);

export default ApolloProvider;
