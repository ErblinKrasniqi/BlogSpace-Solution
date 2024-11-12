const User = require("../models/user");
// Endpoint to like/unlike a post
exports.toggleLike = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId; // Assuming userId is available via authentication middleware

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Check if the post is already liked
    const postIndex = user.likedPosts.indexOf(postId);
    if (postIndex >= 0) {
      // Unlike: Remove from liked posts
      user.likedPosts.splice(postIndex, 1);
    } else {
      // Like: Add to liked posts
      user.likedPosts.push(postId);
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Like status updated", likedPosts: user.likedPosts });
  } catch (err) {
    next(err);
  }
};

// Endpoint to get liked posts
exports.getLikedPosts = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("likedPosts");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ likedPosts: user.likedPosts });
  } catch (err) {
    next(err);
  }
};
