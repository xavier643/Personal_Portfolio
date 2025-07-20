// index.js
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");
const { passport } = require("./authentication/auth"); // Adjust the path if necessary
const typeDefs = require("./schemas/index");
const resolvers = require("./resolvers/index");
const connectDB = require("./config/db");
require("dotenv").config();
const User = require("./models/User");

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
      const token = req.headers.authorization || "";
      if (token) {
        try {
          // Remove "Bearer " prefix if present
          const actualToken = token.replace("Bearer ", "");

          const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
          console.log("🔍 decoded.session_id:", decoded.session_id);

          const user = await User.findById(decoded.id);
          console.log("🧠 user.session_id in DB:", user?.session_id);
          if (!user || user.session_id !== decoded.session_id) {
            console.warn("⚠️ Session mismatch");
            throw new Error("Session invalid or expired");
          }

          console.log("User:", user);

          return { user };
        } catch (err) {
          console.error("Token verification failed:", err);
        }
      }
      return {};
    },
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
