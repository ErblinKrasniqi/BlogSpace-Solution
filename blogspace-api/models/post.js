const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      reuqired: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    creatorName: {
      type: String,
      required: true,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.index({ title: "text" });

module.exports = mongoose.model("Post", postSchema);
