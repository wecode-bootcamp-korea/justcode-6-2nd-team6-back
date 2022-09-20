-- migrate:up

CREATE TABLE vouchers (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(300) NOT NULL,
description VARCHAR(3000),
origin_price DECIMAL(6,3) NOT NULL,
sale_price DECIMAL(6,3),
membership_id INT,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (membership_id) REFERENCES memberships (id)
)

-- migrate:down

DROP TABLE vouchers;