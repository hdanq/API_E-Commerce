const ProductCategory = require("../models/ProductCategory");

const productCategoryController = {
  // Create a new product category
  createProductCategory: async (req, res, next) => {
    try {
      const productCategory = await ProductCategory.create(req.body);
      return res.status(201).json({
        success: productCategory ? true : false,
        createdCategory: productCategory
          ? productCategory
          : "Can not create product category!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Get product category
  getProductCategory: async (req, res, next) => {
    try {
      const productCategory = await ProductCategory.find().select("title _id");
      return res.status(200).json({
        success: productCategory ? true : false,
        productCategories: productCategory
          ? productCategory
          : "Can not get product category!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Update product category
  updateProductCategory: async (req, res, next) => {
    try {
      const { cid } = req.params;
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Please provide data to update!",
        });
      }
      const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
        cid,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({
        success: updatedProductCategory ? true : false,
        updatedCategory: updatedProductCategory
          ? updatedProductCategory
          : "Can not update product category!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete product category
  deleteProductCategory: async (req, res, next) => {
    try {
      const { cid } = req.params;
      const deletedProductCategory = await ProductCategory.findByIdAndDelete(
        cid
      );
      return res.status(200).json({
        success: deletedProductCategory ? true : false,
        deletedCategory: deletedProductCategory
          ? deletedProductCategory
          : "Can not delete product category!",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productCategoryController;
