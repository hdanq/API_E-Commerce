const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    disLiked: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    thumbnail: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Blog", Blog);
