const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comment");
const path = require("path");
const fs = require("fs");
const io = require("../socket");

exports.register = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error(JSON.stringify(errors.errors[0].msg));
      error.statusCode = 400;
      throw error;
    }

    const isSame = await User.findOne({ email: email });
    if (isSame) {
      const error = new Error("User already exists 🤔");
      error.statusCode = 400;
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      name: name,
      password: hashedPw,
    });

    const results = await user.save();

    res.status(201).json({ message: "User created 😁", userId: results._id });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("No user found 🤔");
      error.statusCode = 400;
      throw error;
    }
    loadedUser = user;

    const doesMatch = await bcrypt.compare(password, user.password);

    if (!doesMatch) {
      const error = new Error("Wrong password ⛔");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id,
        userName: loadedUser.name,
        role: loadedUser.role,
      },
      "superdupersecret"
    );

    res.status(200).json({
      token: token,
      userName: loadedUser.name,
      role: loadedUser.role,
      userId: loadedUser._id,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (user.role !== "Admin") {
      const error = new Error("You are not authorized 🚫");
      error.statusCode = 403;
      throw error;
    }

    const users = await User.find();

    res.status(200).json({ users: users });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (user.role !== "Admin") {
      const error = new Error("You are not admin ⛔");
      error.statusCode(400);
      throw error;
    }

    const userToDelete = await User.findById(id);

    if (userToDelete.posts) {
      for (let postId of userToDelete.posts) {
        const post = await Post.findById(postId);

        clearImage(post.imageUrl);
      }
    }

    await Post.deleteMany({ creator: id });

    await Comment.deleteMany({ user: id });

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User has been delted 😁" });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    console.log(req.file); // Log the file data for debugging
    if (!req.file) {
      const error = new Error("No file provided 🥲");
      error.statusCode = 422;
      throw error;
    }

    const userId = req.userId || req.params.userId;
    if (!userId) {
      const error = new Error("User ID not found 😔");
      error.statusCode = 400;
      throw error;
    }

    const imageUrl = `/images/${req.file.filename}`; // Save relative path
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      const error = new Error("User not found 🥲");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Profile updated successfully 🌟",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.sendMessage = (req, res, next) => {
  const message = req.body.message;

  io.getIO().emit("message", { user: req.userId, message: message });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "../images", filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
