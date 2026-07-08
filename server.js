const express = require("express");
require("dotenv").config();

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

app.use(errorHandler);

// Health Check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();