const mongoose = require("mongoose");
const Comment = require("./comment");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

userSchema.pre("remove", function (next) {
  // This should delete all comments where user ID matches the current user being deleted
  this.model("Comment").deleteMany({ user: this._id }, next);
});

module.exports = mongoose.model("User", userSchema);
