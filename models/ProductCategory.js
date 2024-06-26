const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductCategory = new Schema(
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

module.exports = mongoose.model("ProductCategory", ProductCategory);
