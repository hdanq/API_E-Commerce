const e = require("express");
const Coupon = require("../models/Coupon");

const CouponController = {
  // Create a new coupon
  createCoupon: async (req, res, next) => {
    try {
      const { code, discount, expired } = req.body;
      if (!expired) {
        return res.status(400).json({
          success: false,
          message: "Expired date is required!",
        });
      }
      let expireAt = new Date();

      expireAt.setDate(expireAt.getDate() + +expired);
      expireAt.setHours(23, 59, 59, 999);

      const createdCoupon = await Coupon.create({ code, discount, expireAt });
      return res.status(201).json({
        success: createdCoupon ? true : false,
        createdCoupon: createdCoupon ? createdCoupon : "Can not create coupon!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all coupons
  getCoupons: async (req, res, next) => {
    try {
      const coupons = await Coupon.find();
      return res.status(200).json({
        success: coupons ? true : false,
        coupons: coupons ? coupons : "Can not get coupons!",
      });
    } catch (error) {
      next(error);
    }
  },

  //Delete expired coupon
  delCoupon: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCoupon = await Coupon.findByIdAndDelete(id);
      return res.status(200).json({
        success: deletedCoupon ? true : false,
        deletedCoupon: deletedCoupon ? deletedCoupon : "Can not delete coupon!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete all expired coupons
  deleteCoupons: async (req, res, next) => {
    try {
      const deletedCoupon = await Coupon.deleteMany({
        expireAt: { $lt: new Date() },
      });
      return res.status(200).json({
        success: deletedCoupon ? true : false,
        deletedCoupon: deletedCoupon ? deletedCoupon : "Can not delete coupon!",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = CouponController;
