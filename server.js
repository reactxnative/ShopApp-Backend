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

// REST Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    await graphqlServer.start();

    app.use(
      "/graphql",
      express.json(),
      expressMiddleware(graphqlServer, {
        context: async ({ req }) => {
          let user = null;

          if (req.headers.authorization) {
            user = await verifyAccessToken(req.headers.authorization);
          }

          return { user };
        },
      })
    );

    // ✅ Error handler LAST
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();