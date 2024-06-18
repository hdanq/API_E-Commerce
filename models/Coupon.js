const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Coupon = new Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
    },
    discount: {
      type: Number,
      required: [true, "Discount is required"],
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", Coupon);
