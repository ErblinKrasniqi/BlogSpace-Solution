const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("You are to authorized ⛔");
    error.statusCode = 400;
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
    error.statusCode = 400;
    throw error;
  }
  req.userid = decodedToken.userId;
  req.userName = decodedToken.userName;
  next();
};
