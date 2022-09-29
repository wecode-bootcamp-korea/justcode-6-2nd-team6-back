const purchaseService = require("../services/purchase");

const getVouchers = async (req, res) => {
  try {
    const vouchers = await purchaseService.getVouchers();
    res.status(200).json({ data: vouchers });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "ERROR" });
  }
};

const getUserVouchers = async (req, res) => {
  const { userId } = req.findUser;

  if (!userId) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  try {
    const vouchers = await purchaseService.getUserVouchers(userId);
    res.status(200).json({ data: vouchers });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const purchaseVoucher = async (req, res) => {
  const { voucherId, payment, payWith, paymentType } = req.body;
  const { userId } = req.findUser;

  if (!userId) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  if (!voucherId) {
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }

  try {
    await purchaseService.purchaseVoucher(
      voucherId,
      userId,
      payment,
      payWith,
      paymentType,
    );
    res.status(200).json({ message: "PURCHASE_SUCCESS" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const getUserPurchase = async (req, res) => {
  const { userId } = req.findUser;

  if (!userId) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  try {
    const voucher = await purchaseService.getUserPurchase(userId);
    res.status(200).json({ data: voucher });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

module.exports = {
  getVouchers,
  getUserVouchers,
  purchaseVoucher,
  getUserPurchase,
};
