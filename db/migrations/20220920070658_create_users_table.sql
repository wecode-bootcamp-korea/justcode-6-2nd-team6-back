-- migrate:up

CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
account VARCHAR(100) NOT NULL UNIQUE KEY,
password VARCHAR(3000) NOT NULL,
name VARCHAR(50) NOT NULL,
birth VARCHAR(100),
phone VARCHAR(100),
voucher_id INT,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (voucher_id) REFERENCES vouchers (id)
)

-- migrate:down

DROP TABLE users;