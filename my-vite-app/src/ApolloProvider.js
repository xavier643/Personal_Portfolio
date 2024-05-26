import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { from } from '@apollo/client';
import { toast } from 'react-toastify';

// Create an http link:
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // replace with your server URL
});

// Create a middleware link to set the token in the request headers
const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  // Check if the token is about to expire and refresh it if necessary
  if (token && tokenExpiration && Date.now() > tokenExpiration - 60000) { // Refresh 1 minute before expiry
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query: `mutation {
          refreshToken {
            token
            expiresIn
          }
        }`
      })
    });
    const result = await response.json();

    if(result.data.refreshToken == null) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      // Optionally, redirect to login page or show a modal
      window.location.href = '/login';
    } else {
      const newToken = result.data.refreshToken.token;
      const newTokenExpiration = Date.now() + result.data.refreshToken.expiresIn * 1000;
      localStorage.setItem('token', newToken);
      localStorage.setItem('tokenExpiration', newTokenExpiration);
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create an errorLink to handle errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log("graphQLErrors", graphQLErrors);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === 'Unauthorized' || message === 'Not authenticated') {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        window.location.href = '/login';
      }
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

// Add periodic check to log out user if token has expired
const checkTokenExpiration = async () => {
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  const token = localStorage.getItem('token');

  if (tokenExpiration && Date.now() > tokenExpiration) {
    console.log('!!!!!! Token expired !!!!!!');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    window.location.href = '/login';
  } else if (token && tokenExpiration && Date.now() > tokenExpiration - 60000) {
    console.log("!!!!!! Token will expire soon !!!!!!")
    toast.warn('Your session is about to expire. Please save your work.');
  }
};

// Check token expiration every 30 second
setInterval(checkTokenExpiration, 30000);

export default client;
