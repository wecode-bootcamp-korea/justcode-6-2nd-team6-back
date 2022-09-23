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
router.patch(
  "/my",
  validateToken.validateToken,
  purchaseController.purchaseVoucher,
);

module.exports = router;
