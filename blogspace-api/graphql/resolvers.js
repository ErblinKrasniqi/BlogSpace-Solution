const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Email is invalid 🥲" });
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: "Password to short 📏" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exist already");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);

    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });

    const createdUser = await user.save();
    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
      message: "User Created 😁",
    };
  },

  login: async function ({ email, password }) {
    let loadedUser;

    const user = await User.findOne({ email: email });
    loadedUser = user;

    if (!user) {
      const error = new Error("User not found");
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password is incorrect");
      error.code = 401;
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

    return {
      token: token,
      userName: loadedUser.name,
      role: loadedUser.role,
      userId: user._id.toString(),
    };
  },

  getPosts: async function () {
    const posts = await Post.find();

    console.log(posts);

    return {
      posts: posts.map((p) => {
        console.log(p);
        return {
          ...p._doc,
          _id: p._id.toString(),
          createdAt: p.createdAt.toString(),
          updatedAt: p.updatedAt.toString(),
        };
      }),
    };
  },
};
