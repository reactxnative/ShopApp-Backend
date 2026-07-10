const verifyAccessToken = require("../utils/verifyAccessToken");

const authMiddleware = (req, res, next) => {
  const decoded = verifyAccessToken(req.headers.authorization);

  req.user = decoded;

  next();
};

module.exports = authMiddleware;