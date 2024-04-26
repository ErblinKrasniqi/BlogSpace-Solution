const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");
const validator = require("../middleware/validators");

router.get("/post", postController.get);

router.post("/post", isAuth, validator.post, postController.create);

router.put("/post/:id", isAuth, validator.post, postController.edit);

router.delete("/post/:id", isAuth, validator.post, postController.delete);

module.exports = router;
