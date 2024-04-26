const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");
const validator = require("../middleware/validators");

router.post("/post", isAuth, validator.post, postController.create);

module.exports = router;
