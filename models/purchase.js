const { myDataSource } = require("./typeorm-client");

//이용권 조회
const getVouchers = async () => {
  const vouchers = await myDataSource.query(
    `SELECT 
      v.id AS voucherId,
      v.name AS voucherName,
      v.description,
      REPLACE(v.origin_price, '.', ',') AS origin_price,
      REPLACE(v.origin_price - v.sale_price, '.', ',') AS sale_price,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "membershipId", m.id,
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
const getUserVouchers = async (userId) => {
  const voucher = await myDataSource.query(
    `SELECT
      p.user_id AS userId,
      p.voucher_id AS voucherId,
      v.name AS voucherName,
      p.payment,
      p.pay_with, 
      CASE 
      WHEN p.payment = "100"
      THEN DATE_FORMAT(DATE_ADD(p.created_at, INTERVAL 6 MONTH), '%Y.%m.%d 23:59:59 까지')
      ELSE DATE_FORMAT(DATE_ADD(p.created_at, INTERVAL 1 MONTH), '%Y.%m.%d 23:59:59 까지')
      END AS period
    FROM purchase p
    JOIN vouchers v ON p.voucher_id = v.id
    JOIN memberships m ON v.membership_id = m.id
    WHERE p.user_id = ?`,
    [userId],
  );
  return voucher;
};

//이용권 구매
const purchaseVoucher = async (voucherId, userId, payment, payWith) => {
  const purchase = await myDataSource.query(
    `INSERT INTO purchase (
      voucher_id, user_id, payment, pay_with)
    VALUES(?, ?, ?, ?)`,
    [voucherId, userId, payment, payWith],
  );
  return purchase;
};

module.exports = {
  getVouchers,
  getUserVouchers,
  purchaseVoucher,
};
