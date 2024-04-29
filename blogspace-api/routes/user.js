const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const validator = require("../middleware/validators");
const isAuth = require("../middleware/is-auth");

router.post("/register", validator.user, userController.register);

router.post("/login", userController.login);

router.get("/users", isAuth, userController.getUsers);

router.delete("/user/:id", isAuth, userController.deleteUser);

module.exports = router;
