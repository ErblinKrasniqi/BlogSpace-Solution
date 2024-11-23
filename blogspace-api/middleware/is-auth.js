const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("You are not authoricated 🚫");
    error.statusCode = 403;

    throw error;
  }
  let decodedToken;

  try {
    decodedToken = jwt.verify(authHeader, "superdupersecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Token did not decode 🧑‍💻");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  req.userName = decodedToken.userName;
  req.role = decodedToken.role;
  next();
};
