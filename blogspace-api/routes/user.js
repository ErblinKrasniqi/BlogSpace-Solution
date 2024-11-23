const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const validator = require("../middleware/validators");
const isAuth = require("../middleware/is-auth");

router.post("/register", validator.user, userController.register);

router.post("/login", userController.login);

router.get("/users", isAuth, userController.getUsers);

router.get("/user/:id", isAuth, userController.getUserProfile);

router.post("/user/profile", isAuth, userController.updateProfile);

router.delete("/user/:id", isAuth, userController.deleteUser);

router.post("/message", isAuth, userController.sendMessage);

module.exports = router;
