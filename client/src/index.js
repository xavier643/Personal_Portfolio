import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';
import ApolloProvider from './ApolloProvider'; // Import your ApolloProvider

const container = document.getElementById('root'); // Get the container element
const root = createRoot(container); // Create a root instance

root.render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
