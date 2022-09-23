const { myDataSource } = require("./typeorm-client");

//이용권 조회
const getVouchers = async () => {
  const vouchers = await myDataSource.query(
    `SELECT 
      v.name AS voucherName,
      v.description,
      REPLACE(v.origin_price, '.', ',') AS origin_price,
      v.origin_price - v.sale_price AS sale_price,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "membershipName", m.name,
          "description", m.description,
          "origin_price", REPLACE(m.origin_price, '.', ','),
          "benefit_price", REPLACE(m.benefit_price, '0.', '')
        )
      ) AS membership
  FROM vouchers v
  LEFT OUTER JOIN memberships m ON v.membership_id = m.id
  GROUP BY v.id`,
  );
  return vouchers;
};

// //유저 이용권 조회
const getUserVouchers = async (id) => {
  const voucher = await myDataSource.query(
    `SELECT 
    u.id,  
    u.name,
    u.voucher_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "voucherName", v.name,
          "description", v.description
        )
      ) AS voucher
  FROM users u
  JOIN vouchers v ON u.voucher_id = v.id
  WHERE u.id = ?
  GROUP BY u.id`,
    [id],
  );
  return voucher;
};

//이용권 구매
const purchaseVoucher = async (voucher_id, userId) => {
  const purchase = await myDataSource.query(
    `UPDATE users
    SET voucher_id = ?
    WHERE id = ?`,
    [voucher_id, userId],
  );
  return purchase;
};

module.exports = {
  getVouchers,
  getUserVouchers,
  purchaseVoucher,
};
