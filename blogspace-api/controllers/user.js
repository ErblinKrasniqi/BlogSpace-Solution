const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    const errors = validationResult(req);
    console.log(errors.errors.map((err) => err));

    if (!errors.isEmpty()) {
      const error = new Error(JSON.stringify(errors.errors));
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
      },
      "superdupersecret"
    );

    res.status(200).json({ token: token, userName: loadedUser.name });
  } catch (err) {
    next(err);
  }
};
