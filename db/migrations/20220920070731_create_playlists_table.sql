-- migrate:up

CREATE TABLE playlists (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
character_id INT NOT NULL,
name VARCHAR(5000),
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (character_id) REFERENCES user_characters (id)
)

-- migrate:down

DROP TABLE playlists;