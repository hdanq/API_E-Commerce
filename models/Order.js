const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    total: {
      type: Number,
      required: true,
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
