const purchaseDao = require("../models/purchase");

const getVouchers = async () => {
  const vouchers = await purchaseDao.getVouchers();

  vouchers.map((data) => {
    data.payments = JSON.parse(data.payments);
  });

  return vouchers;
};

const getUserVouchers = async (id) => {
  const vouchers = await purchaseDao.getUserVouchers(id);

  if (!vouchers) {
    const err = new Error("NOT_PURCHASE_VOUCHER");
    err.statusCode = 404;
    throw err;
  }

  return vouchers;
};

const purchaseVoucher = async (
  voucherId,
  userId,
  payment,
  payWith,
  paymentType,
) => {
  return await purchaseDao.purchaseVoucher(
    voucherId,
    userId,
    payment,
    payWith,
    paymentType,
  );
};

//유저 이용권 조회
const getUserPurchase = async (userId) => {
  return await purchaseDao.getUserPurchase(userId);
};

module.exports = {
  getVouchers,
  getUserVouchers,
  purchaseVoucher,
  getUserPurchase,
};
