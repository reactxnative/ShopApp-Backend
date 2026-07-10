const express = require("express");
require("dotenv").config();
const { expressMiddleware } = require("@as-integrations/express5");
const graphqlServer = require("./src/graphql");
const verifyAccessToken = require("./src/utils/verifyAccessToken");

const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());

const errorHandler = require("./src/middleware/error.middleware");

// Routes
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const productRoutes = require("./src/routes/product.routes");

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);



// Health Check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    // start graphql server
    await graphqlServer.start();
    app.use(
      "/graphql",
      express.json(),
      expressMiddleware(graphqlServer,{
        context: async ({ req }) => {
       
          let user = null;
          if (req.headers.authorization) {
            user = await verifyAccessToken(req.headers.authorization);
          }
          return { user };
        }
      })
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`🚀 GraphQL server is running on http://localhost:${PORT}/graphql `)
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();