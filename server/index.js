const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const connectDB = require('./config/db')

require('dotenv').config();

connectDB();

// Create and start your Apollo Server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  
  // Start standalone server
  await startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
