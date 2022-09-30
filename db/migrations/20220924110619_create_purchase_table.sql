-- migrate:up

CREATE TABLE purchase (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
voucher_id INT NOT NULL,
user_id INT NOT NULL,
payment VARCHAR(20),
pay_with VARCHAR(30),
type VARCHAR(50),
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (voucher_id) REFERENCES vouchers (id),
FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down

DROP TABLE purchase;