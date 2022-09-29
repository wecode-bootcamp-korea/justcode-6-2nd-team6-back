const express = require("express");
const validateToken = require("../middlewares/user");
const purchaseController = require("../controllers/purchase");

const router = express.Router();

router.get("/voucher", purchaseController.getVouchers);
router.get(
  "/my",
  validateToken.validateToken,
  purchaseController.getUserVouchers,
);
router.post(
  "/my",
  validateToken.validateToken,
  purchaseController.purchaseVoucher,
);

router.get(
  "/user",
  validateToken.validateToken,
  purchaseController.getUserPurchase,
);

module.exports = router;
