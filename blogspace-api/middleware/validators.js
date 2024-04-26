const { body } = require("express-validator");

exports.user = [
  body("email").trim().isLength({ min: 3, max: 15 }),
  body("name").trim().isLength({ min: 3, max: 15 }),
  body("password").trim().isLength({ min: 3, max: 15 }),
];
