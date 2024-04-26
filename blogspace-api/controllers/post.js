const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.create = async (req, res, next) => {
  let loadedPost;
  let creator;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error(errors);
      error.statusCode = 400;
      throw error;
    }

    const title = req.body.title;
    const description = req.body.description;

    const post = new Post({
      title: title,
      description: description,
      creator: req.userId,
    });

    const results = await post.save();

    if (!results) {
      const error = new Error("Post not created 🥲");
      error.statusCode = 400;
      throw error;
    }

    loadedPost = results;

    const user = await User.findById(req.userId);

    user.posts.push(loadedPost);
    creator = user;

    await user.save();

    res.status(201).json({
      message: "Post created 😁",
      post: results,
      creator: { creator: creator.name, creatorId: creator._id },
    });
  } catch (err) {
    next(err);
  }
};
