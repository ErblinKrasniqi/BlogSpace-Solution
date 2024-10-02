const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");
const validator = require("../middleware/validators");

router.get("/post", postController.get);

router.get("/post/:id", postController.getOne);

router.get("/posts", isAuth, postController.getMyPosts);

router.post("/post", isAuth, validator.post, postController.create);

router.put("/post/:id", isAuth, validator.post, postController.edit);

router.delete("/post/:id", isAuth, validator.post, postController.delete);

router.get("/search", postController.searchPost);

router.get("/like/:id", isAuth, postController.likePost);

router.get("/like", postController.getLikePosts);

module.exports = router;
