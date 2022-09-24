-- migrate:up

CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE KEY,
password VARCHAR(3000) NOT NULL,
name VARCHAR(50) NOT NULL,
birth VARCHAR(100),
phone VARCHAR(100),
profile_image varchar(2000),
created_at TIMESTAMP NOT NULL DEFAULT NOW()
)

-- migrate:down

DROP TABLE users;