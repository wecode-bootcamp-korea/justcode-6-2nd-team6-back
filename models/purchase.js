const { myDataSource } = require("./typeorm-client");

//이용권 조회
const getVouchers = async () => {
  const vouchers = await myDataSource.query(
    `SELECT 
    v.id AS voucherId,
    v.name AS voucherName,
    v.description AS description,
    JSON_ARRAY(
      JSON_OBJECT(
        "paymentType", 'regular',
        "name", '정기결제',
        "description", null,
        "originPrice", REPLACE(v.origin_price, '.', ','),
        "salePrice", REPLACE(v.origin_price - v.sale_price, '.', ',')
    ),
      JSON_OBJECT(
        "paymentType", 'membershipT',
        "name", 'T멤버십',
        "description", m.description,
        "originPrice", REPLACE(m.origin_price, '.', ','),
        "salePrice", REPLACE(m.benefit_price, '0.', '')
    ),
      JSON_OBJECT(
        "paymentType", 'oneMonth',
        "name", '1개월권',
        "description", null,
        "originPrice", null,
        "salePrice", REPLACE(v.origin_price, '.', ',')
    )
  ) AS payments
  FROM vouchers v
  LEFT OUTER JOIN memberships m ON v.membership_id = m.id
  GROUP BY v.id`,
  );
  return vouchers;
};

//유저 이용권 조회
const getUserVouchers = async (userId) => {
  const voucher = await myDataSource.query(
    `SELECT
      p.user_id AS userId,
      p.voucher_id AS voucherId,
      v.name AS voucherName,
      p.payment,
      p.pay_with AS payWith,
      CASE 
      WHEN p.type = "regular"
      THEN "정기결제"
      WHEN p.type = "oneMonth"
      THEN "1개월권"
      ELSE "T멤버십"
      END AS paymentType,
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
const purchaseVoucher = async (
  voucherId,
  userId,
  payment,
  payWith,
  paymentType,
) => {
  const purchase = await myDataSource.query(
    `INSERT INTO purchase (
      voucher_id, user_id, payment, pay_with, type)
    VALUES(?, ?, ?, ?, ?)`,
    [voucherId, userId, payment, payWith, paymentType],
  );
  return purchase;
};

//유저 이용권 조회
const getUserPurchase = async (userId) => {
  const purchase = await myDataSource.query(
    `SELECT u.id AS userId,
      CASE 
      WHEN EXISTS (
       SELECT 1 
       FROM purchase p 
       WHERE p.user_id = u.id) 
      THEN 1 
      ELSE 0
      END AS userVoucher
    FROM users u
    WHERE u.id = ?
    `,
    [userId],
  );
  return purchase;
};

/* SELECT
    CASE
    WHEN (select COUNT(*) 
          from purchase p
          where p.user_id = ?) = 0
    THEN '0'
    ELSE '1'
    END AS userVoucher*/

module.exports = {
  getVouchers,
  getUserVouchers,
  purchaseVoucher,
  getUserPurchase,
};
