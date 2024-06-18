const router = require("express").Router();
const blogCategoryController = require("../controllers/blogCategoryController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  blogCategoryController.createBlogCategory
);
router.get("/", blogCategoryController.getBlogCategory);
router.put(
  "/:bid",
  [verifyAccessToken, isAdmin],
  blogCategoryController.updateBlogCategory
);
router.delete(
  "/:bid",
  [verifyAccessToken, isAdmin],
  blogCategoryController.deleteBlogCategory
);

module.exports = router;
