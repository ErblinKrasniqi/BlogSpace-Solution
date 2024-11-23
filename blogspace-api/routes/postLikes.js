const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postLikes");
const isAuth = require("../middleware/is-auth");

router.post("/posts/:postId/like", isAuth, postsController.toggleLike);

router.get("/users/:userId/likedPosts", isAuth, postsController.getLikedPosts);

module.exports = router;
