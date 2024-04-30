const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.postComment = async (req, res, next) => {
  const content = req.body.content;
  const postId = req.body.postId;
  let loadedComment;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("No post found 🤔");
      error.statusCode = 400;
      throw error;
    }

    const comment = new Comment({
      content: content,
      post: postId,
      userName: req.userName,
      user: req.userId,
    });

    await comment.save();

    loadedComment = comment;

    await post.save();

    const user = await User.findById(req.userId);
    user.comments.push(comment);
    await user.save();

    res.status(201).json({ message: "Comment created 😁", comment: comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      const error = new Error("No comment found 🤔");
      error.statusCode = 400;
      throw error;
    }
    if (comment.user.toString() !== req.userId) {
      const error = new Error("Not authorized ⛔");
      error.statusCode = 403;
      throw error;
    }
    const user = await User.findById(req.userId);
    user.comments.pull(id);
    await user.save();

    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
};
