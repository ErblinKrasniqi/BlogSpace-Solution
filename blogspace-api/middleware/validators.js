const { body } = require("express-validator");

exports.user = [
  body("email")
    .trim()
    .isLength({ min: 3, max: 25 })
    .withMessage("Email is to short or long 📏"),
  body("name")
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage("Name is to short or long 📏"),
  body("password")
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage("Password is to short or long 📏"),
];

exports.post = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Title is to short or long 📏"),
  body("description")
    .trim()
    .isLength({ min: 3, max: 250 })
    .withMessage("Description is to short or long 📏"),
];
