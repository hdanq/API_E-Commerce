const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const blogController = require("../controllers/blogController");

router.post("/", [verifyAccessToken, isAdmin], blogController.createBlog);
router.get("/", blogController.getsBlog);
router.get("/one/:bid", blogController.getBlog);
router.put("/togglelike", [verifyAccessToken], blogController.toggleBlogLike);
router.put("/:bid", [verifyAccessToken, isAdmin], blogController.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], blogController.deleteBlog);

module.exports = router;
