const Order = require("../models/Order");
const User = require("../models/Users");
const Coupon = require("../models/Coupon");

const orderController = {
  createOrder: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { coupon_user } = req.body;

      const userCart = await User.findById(_id)
        .select("carts")
        .populate("carts.product", "title price images");

      if (!userCart) {
        return res.status(400).json({
          success: false,
          message: "Cart empty!",
        });
      }

      const coupon = await Coupon.findOne({ code: coupon_user });

      // Map through the userCart.carts and return an object with the product id and quantity
      const products = userCart?.carts?.map((cart) => ({
        product: cart.product._id,
        quantity: cart.quantity,
      }));

      // Calculate the total price of the order
      let total = userCart?.carts?.reduce(
        (acc, cart) => acc + cart.product.price * cart.quantity,
        0
      );

      if (coupon_user && coupon_user === coupon.code) {
        total -= (total * (coupon.discount / 100)).toFixed(2);
      }

      const order = await Order.create({
        user: _id,
        products,
        total,
        coupon: coupon?._id,
      });

      return res.status(201).json({
        success: order ? true : false,
        message: order ? order : "Something went wrong!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Update the status of the order
  updateStatus: async (req, res, next) => {
    try {
      const { oid } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status has not been changed!",
        });
      }

      const order = await Order.findByIdAndUpdate(
        oid,
        { status },
        { new: true }
      );

      return res.status(200).json({
        success: order ? true : false,
        message: order ? order : "Order not found!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all orders by admin
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.find({})
        .populate("user", "name email address")
        .populate("products.product", "title price images");

      return res.status(200).json({
        success: orders ? true : false,
        message: orders ? orders : "Orders not found!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all orders by user
  getMyOrders: async (req, res, next) => {
    try {
      const { _id } = req.user;

      const orders = await Order.find({ user: _id }).populate(
        "products.product",
        "title price images"
      );

      return res.status(200).json({
        success: orders ? true : false,
        message: orders ? orders : "Orders not found!",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
