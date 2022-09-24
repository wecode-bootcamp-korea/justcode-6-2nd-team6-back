-- migrate:up

CREATE TABLE playlists (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name VARCHAR(5000),
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down

DROP TABLE playlists;