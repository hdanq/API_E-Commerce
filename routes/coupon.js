const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const couponController = require("../controllers/couponController");

router.post("/", [verifyAccessToken, isAdmin], couponController.createCoupon);
router.get("/", [verifyAccessToken, isAdmin], couponController.getCoupons);
router.delete("/:id", [verifyAccessToken, isAdmin], couponController.delCoupon);
router.delete(
  "/",
  [verifyAccessToken, isAdmin],
  couponController.deleteCoupons
);

module.exports = router;
