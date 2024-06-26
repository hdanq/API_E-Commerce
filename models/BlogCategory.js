const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogCategory = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogCategory", BlogCategory);
