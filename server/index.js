const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const connectDB = require('./config/db')

require('dotenv').config();

connectDB();

// Function to get the user from the token
function getUserFromToken(token) {
  try {
    if (token) {
      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded successfully: ", decoded)
      return decoded;
    }
  } catch (error) {
    // Log error or handle as needed
    console.error("Token verification failed:", error);
    return null;
  }
  return null;
}

// Create and start your Apollo Server
async function startServer() {
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
      // Extract the token from the Authorization header
      const tokenWithBearer = req.headers.authorization || '';
      const token = tokenWithBearer.split(' ')[1]; // Assuming Bearer token
      console.log("Recieved token: ", token)

      const user = getUserFromToken(token);
      console.log("Decoded user: ", user)

      // Return the context with the user object
      return { user };
    }
  });
  
  // Start standalone server
  await startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
