// index.js
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');
const { passport } = require('./authentication/auth'); // Adjust the path if necessary
const typeDefs = require('./schemas/index');
const resolvers = require('./resolvers/index');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      // console.log('inside context');
      const token = req.headers.authorization || '';
      if (token) {
        try {
          // Remove "Bearer " prefix if present
          const actualToken = token.replace('Bearer ', '');
          const user = jwt.verify(actualToken, process.env.JWT_SECRET);
          console.log('User:', user);
          return { user };
        } catch (err) {
          // console.error('Token verification failed:', err);
        }
      }
      return {};
    },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
