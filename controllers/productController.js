const Product = require("../models/Product");
const slugify = require("slugify");

const productController = {
  // Create a new product
  createProduct: async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Content can not be empty!" });
      }
      if (!req.body.title) {
        return res.status(400).json({ message: "Title can not be empty!" });
      }

      req.body.slug = slugify(req.body.title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });

      const product = await Product.create(req.body);
      return res.status(201).json({
        success: product ? true : false,
        data: product ? product : "Can not create product!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Get product
  getProduct: async (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = await Product.findById(pid);
      return res.status(200).json({
        success: product ? true : false,
        data: product ? product : "Can not get product!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all products
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.find();
      return res.status(200).json({
        success: products ? true : false,
        data: products ? products : "Can not get products!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Update product
  updateProduct: async (req, res, next) => {
    try {
      const { pid } = req.params;

      if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title, {
          lower: true,
          remove: /[*+~.()'"!:@]/g,
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        success: updatedProduct ? true : false,
        data: updatedProduct ? updatedProduct : "Can not update product!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete product
  deleteProduct: async (req, res, next) => {
    try {
      const { pid } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(pid);
      return res.status(200).json({
        success: deletedProduct ? true : false,
        data: deletedProduct ? deletedProduct : "Can not delete product!",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
