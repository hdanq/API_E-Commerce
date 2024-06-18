const router = require("express").Router();
const productCategoryController = require("../controllers/productCategoryController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  productCategoryController.createProductCategory
);
router.get("/", productCategoryController.getProductCategory);
router.put(
  "/:cid",
  [verifyAccessToken, isAdmin],
  productCategoryController.updateProductCategory
);
router.delete(
  "/:cid",
  [verifyAccessToken, isAdmin],
  productCategoryController.deleteProductCategory
);

module.exports = router;
