const Blog = require("../models/Blog");

const BlogController = {
  // Create a new blog
  createBlog: async (req, res, next) => {
    try {
      const createdBlog = await Blog.create(req.body);
      return res.status(201).json({
        success: createdBlog ? true : false,
        createdBlog: createdBlog ? createdBlog : "Can not create blog!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Gets blog
  getsBlog: async (req, res, next) => {
    try {
      const blogs = await Blog.find();
      return res.status(200).json({
        success: blogs ? true : false,
        blogs: blogs ? blogs : "Can not get blog!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Get blog
  getBlog: async (req, res, next) => {
    const info = "firstname lastname email";
    try {
      const { bid } = req.params;
      const blog = await Blog.findByIdAndUpdate(
        bid,
        {
          $inc: { views: 1 },
        },
        { new: true }
      ).populate("likes disLiked", info);
      return res.status(200).json({
        success: blog ? true : false,
        blog: blog ? blog : "Can not get blog!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Update blog
  updateBlog: async (req, res, next) => {
    try {
      const { bid } = req.params;
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Please provide data to update!",
        });
      }
      const updatedBlog = await Blog.findByIdAndUpdate(bid, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({
        success: updatedBlog ? true : false,
        updatedBlog: updatedBlog ? updatedBlog : "Can not update blog!",
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete blog
  deleteBlog: async (req, res, next) => {
    try {
      const { bid } = req.params;
      const deletedBlog = await Blog.findByIdAndDelete(bid);
      return res.status(200).json({
        success: deletedBlog ? true : false,
        deletedBlog: deletedBlog ? deletedBlog : "Can not delete blog!",
      });
    } catch (error) {
      next(error);
    }
  },

  toggleBlogLike: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { bid, action } = req.body;

      if (!bid) {
        return res.status(400).json({
          success: false,
          message: "Please provide blog id!",
        });
      }
      const blog = await Blog.findById(bid);
      const alreadyLiked = blog?.likes?.find(
        (id) => id.toString() === _id.toString()
      );
      const alreadyDisLiked = blog?.disLiked?.find(
        (id) => id.toString() === _id.toString()
      );

      let status = {};

      if (action === "like") {
        // If user already liked the blog, then remove the like and vice versa
        status = alreadyLiked
          ? { $pull: { likes: _id } }
          : { $push: { likes: _id }, $pull: { disLiked: _id } };
      } else if (action === "dislike") {
        // If user already disliked the blog, then remove the dislike and vice versa
        status = alreadyDisLiked
          ? { $pull: { disLiked: _id } }
          : { $push: { disLiked: _id }, $pull: { likes: _id } };
      }

      const updatedBlog = await Blog.findByIdAndUpdate(bid, status, {
        new: true,
      });

      return res.status(200).json({
        success: updatedBlog ? true : false,
        updatedBlog: updatedBlog || "Somethings went wrong!",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = BlogController;
