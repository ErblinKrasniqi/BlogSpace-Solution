const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Like = require("../models/likes");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");

exports.get = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 2;

  try {
    const totalItems = await Post.find().countDocuments();

    const posts = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    if (posts.length === 0) {
      const error = new Error("There are currenlty no posts 🌵");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({ posts, totalItems });
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    const comments = await Comment.find({ post: id });

    if (!post) {
      const error = new Error("No post found 🤔");
      error.statusCode = 400;
      throw error;
    }

    res
      .status(200)
      .json({ message: "Found Post 😁", post: post, comments: comments });
  } catch (err) {
    next(err);
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error("No user found 🤔");
      error.statusCode = 400;
      throw error;
    }

    if (user.posts.length === 0) {
      const error = new Error("No posts found 🌵");
      error.statusCode = 400;
      throw error;
    }

    const posts = await Post.find({ _id: { $in: user.posts } });

    res.status(200).json({ posts: posts });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;

  let loadedPost;
  let creator;

  try {
    if (!req.file) {
      const error = new Error("No file provided 🥲");
      error.statusCode = 422;
      throw error;
    }
    const imageUrl = req.file.filename;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error(errors.errors[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const post = new Post({
      title: title,
      description: description,
      imageUrl: imageUrl,
      creatorName: req.userName,
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
      post: loadedPost,
      creator: { creator: creator.name, creatorId: creator._id },
    });
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.file?.filename;
  const id = req.params.id;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error(errors.errors[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const post = await Post.findById(id);

    if (!post) {
      const error = new Error("No post found 🥲");
      error.statusCode = 400;
      throw error;
    }

    if (post.creator.toString() !== req.userId) {
      const error = new Error("You cant edit this post 😯");
      error.statusCode = 400;
      throw error;
    }
    if (imageUrl) {
      clearImage(post.imageUrl);
      post.imageUrl = imageUrl;
    }

    post.title = title;
    post.description = description;

    await post.save();

    res.status(200).json({ message: "Post updated 😁", post: post._id });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("Post does not exist 🌵");
      error.statusCode = 400;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("You cant delete this post 😯");
      error.statusCode = 400;
      throw error;
    }
    clearImage(post.imageUrl);
    const user = await User.findById(req.userId);

    user.posts.pull(id);

    await user.save();

    await Post.findByIdAndDelete(id);
    res.status(200).json({
      message: "Deleted post 💀",
    });
  } catch (error) {
    next(error);
  }
};

exports.searchPost = async (req, res, next) => {
  const search = req.query.search;
  try {
    const posts = await Post.find({ title: new RegExp(search, "i") });
    if (posts.length === 0) {
      const error = new Error("No post found 🌵");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({ message: "Found posts 😁", posts: posts });
  } catch (error) {
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    console.log("It hit the url !");
    const postId = req.params.id; // Assuming the post ID is passed in the URL
    const userId = req.userId; // Assuming you're using some auth middleware to get the user ID

    console.log(postId, userId);

    // Find if the user has already liked the post
    const like = await Like.findOne({ post: postId, user: userId });

    if (like) {
      // If the like exists, unlike (remove the like)
      await Like.findOneAndDelete({ _id: like._id });
    } else {
      // If no like exists, create a new like
      const newLike = new Like({ user: userId, post: postId });
      await newLike.save();
    }

    // Count the total number of likes for the post
    const likeCount = await Like.countDocuments({ post: postId });

    // Send success response with updated like count
    res.status(200).json({ message: "Success!", likes: likeCount });
  } catch (err) {
    next(err);
  }
};

exports.getLikePosts = async (req, res, next) => {
  try {
    let likes = await Like.find().populate("user", "name");

    let users = likes.map((like) => ({
      userId: like.user._id.toString(),
      name: like.user.name,
    }));

    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "../images", filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
