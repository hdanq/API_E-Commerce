const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], productController.createProduct);
router.get("/", productController.getProducts);
router.put(
  "/:pid",
  [verifyAccessToken, isAdmin],
  productController.updateProduct
);
router.delete("/:pid", productController.deleteProduct);
router.get("/:pid", productController.getProduct);

module.exports = router;
