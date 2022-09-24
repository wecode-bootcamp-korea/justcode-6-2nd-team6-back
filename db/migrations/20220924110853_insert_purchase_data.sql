-- migrate:up

INSERT INTO purchase (voucher_id, user_id, payment, pay_with)
VALUES("1", "1", "100", "카카오페이"),
("1", "3", "11,000", "카카오페이"),
("1", "6", "10,900", "네이버페이");

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE purchase;
SET FOREIGN_KEY_CHECKS = 1;
