const purchaseDao = require("../models/purchase");

const getVouchers = async () => {
  const vouchers = await purchaseDao.getVouchers();

  vouchers.map((data) => {
    data.membership = JSON.parse(data.membership);
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

  vouchers.map((data) => {
    data.voucher = JSON.parse(data.voucher);
  });

  return vouchers;
};

const purchaseVoucher = async (voucherId, id) => {
  return await purchaseDao.purchaseVoucher(voucherId, id);
};

module.exports = {
  getVouchers,
  getUserVouchers,
  purchaseVoucher,
};
