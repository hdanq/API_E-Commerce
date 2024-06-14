const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: Array,
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Please enter stock"],
    },
    sale: {
      type: Number,
      default: 0,
    },
    rating: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
        comment: { type: String },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      enum: ["white", "black", "blue", "red", "green", "yellow", "purple"],
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);
