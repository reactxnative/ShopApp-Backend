const jwt = require("jsonwebtoken");

const verifyAccessToken = (authHeader) => {
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.replace("Bearer ", "");

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = verifyAccessToken;