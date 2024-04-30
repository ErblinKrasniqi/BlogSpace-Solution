const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const isAuth = require("../middleware/is-auth");

router.post("/comment", isAuth, commentController.postComment);

router.delete("/comment/:id", isAuth, commentController.deleteComment);

module.exports = router;
