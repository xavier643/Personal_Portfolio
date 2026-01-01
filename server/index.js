// server/index.js
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const typeDefs = require("./schemas/index");
const resolvers = require("./resolvers/index");
const User = require("./models/User");

connectDB();

async function startServer() {
  const app = express();

  app.use(
    cors({
      origin: function (origin, callback) {
        console.log("🌐 Incoming CORS Origin:", origin);
        const allowed = ["http://localhost:3000", process.env.FRONTEND_URL];
        if (!origin || allowed.includes(origin)) {
          callback(null, true);
        } else {
          console.warn("❌ Blocked by CORS:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        if (token) {
          try {
            const actualToken = token.replace("Bearer ", "");
            const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user || user.session_id !== decoded.session_id) {
              console.warn("⚠️ Session mismatch");
              throw new Error("Session invalid or expired");
            }
            return { user };
          } catch (err) {
            console.error("Token verification failed:", err);
          }
        }
        return {};
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
