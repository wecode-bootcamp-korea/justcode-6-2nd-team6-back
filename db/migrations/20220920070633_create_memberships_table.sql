-- migrate:up

CREATE TABLE memberships (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(300),
description VARCHAR(3000),
origin_price DECIMAL(6,3),
benefit_price DECIMAL(6,3)
)

-- migrate:down

DROP TABLE memberships;