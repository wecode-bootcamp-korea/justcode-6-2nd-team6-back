-- migrate:up

CREATE TABLE genres (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(3000)
)

-- migrate:down

DROP TABLE genres;