const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const validator = require("../middleware/validators");

router.post("/register", validator.user, userController.register);

router.post("/login", userController.login);

module.exports = router;
