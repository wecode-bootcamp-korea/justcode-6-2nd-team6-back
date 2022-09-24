-- migrate:up

CREATE TABLE release_companies(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(2000),
created_at TIMESTAMP NOT NULL DEFAULT NOW()
)

-- migrate:down

DROP TABLE release_companies;