//Express
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

//Middleware
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

//Routes
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const postLike = require("./routes/postLikes");

const fileStroage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());

app.use(
  multer({ storage: fileStroage, fileFilter: fileFilter }).single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", userRoute);

app.use("/api", postRoute);

app.use("/api", commentRoute);

app.use("/api", postLike);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// const MONGODB_URI = `mongodb+srv://dummyuser:<db_password>@cluster0.jtxd4hp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const DEFAULT_MONGO_URI =
  "mongodb://127.0.0.1:27017/BlogSpace?retryWrites=true&authSource=admin";

const MONGODB_URI = process.env.MONGO_URI || DEFAULT_MONGO_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });
