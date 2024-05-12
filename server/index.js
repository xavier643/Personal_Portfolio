const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// Define your schema directly as a GraphQL type definition string
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Define your resolvers as usual
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create and start your Apollo Server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at http://localhost:4000`);
}

startServer();
