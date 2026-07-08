const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Authorization Header
    const authHeader = req.headers.authorization;

    // Check Header Exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });
    }

    // Check Bearer Token
    if (!authHeader.startsWith("Bearer ")) {  
      return res.status(401).json({
        success: false,
        message: "Invalid token format.",
      });
    }

    // Get Token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Store User Data
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;