const BlogCategory = require("../models/BlogCategory");

const BlogCategoryController = {
  // Create a new blog category
  createBlogCategory: async (req, res, next) => {
    try {
      const createdBlogCategory = await BlogCategory.create(req.body);
      return res.status(201).json({
        success: createdBlogCategory ? true : false,
        createdCategory: createdBlogCategory
          ? createdBlogCategory
          : "Can not create blog category!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Get blog category
  getBlogCategory: async (req, res, next) => {
    try {
      const blogCategories = await BlogCategory.find().select("title _id");
      return res.status(200).json({
        success: blogCategories ? true : false,
        blogCategories: blogCategories
          ? blogCategories
          : "Can not get blog category!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Update blog category
  updateBlogCategory: async (req, res, next) => {
    try {
      const { bid } = req.params;
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Please provide data to update!",
        });
      }
      const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(
        bid,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({
        success: updatedBlogCategory ? true : false,
        updatedCategory: updatedBlogCategory
          ? updatedBlogCategory
          : "Can not update blog category!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete blog category
  deleteBlogCategory: async (req, res, next) => {
    try {
      const { bid } = req.params;
      const deletedBlogCategory = await BlogCategory.findByIdAndDelete(bid);
      return res.status(200).json({
        success: deletedBlogCategory ? true : false,
        deletedCategory: deletedBlogCategory
          ? deletedBlogCategory
          : "Can not delete blog category!",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = BlogCategoryController;
