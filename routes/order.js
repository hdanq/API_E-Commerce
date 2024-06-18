const router = require("express").Router();
const orderController = require("../controllers/oderController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", verifyAccessToken, orderController.getMyOrders);
router.post("/", verifyAccessToken, orderController.createOrder);
router.put(
  "/status/:oid",
  [verifyAccessToken, isAdmin],
  orderController.updateStatus
);
router.get(
  "/admin/check-orders",
  [verifyAccessToken, isAdmin],
  orderController.getOrders
);

module.exports = router;
