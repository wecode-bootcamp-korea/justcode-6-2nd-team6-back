-- migrate:up

CREATE TABLE user_characters (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name VARCHAR(3000) NOT NULL,
profile_image VARCHAR(2000),
FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down

DROP TABLE user_characters;