const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary/cloudinary.config");

router.post("/", [verifyAccessToken, isAdmin], productController.createProduct);
router.get("/", productController.getProducts);
router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10),
  productController.uploadImage
);
router.put("/ratings", verifyAccessToken, productController.ratingProduct);
router.put(
  "/:pid",
  [verifyAccessToken, isAdmin],
  productController.updateProduct
);
router.delete("/:pid", productController.deleteProduct);
router.get("/:pid", productController.getProduct);

module.exports = router;
