-- migrate:up

CREATE TABLE management_companies (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(2000),
created_at TIMESTAMP NOT NULL DEFAULT NOW()
)

-- migrate:down

DROP TABLE management_companies;