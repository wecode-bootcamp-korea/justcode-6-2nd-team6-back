-- migrate:up

CREATE TABLE reviews (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
character_id INT NOT NULL,
comment VARCHAR(3000) NOT NULL,
playlist_id INT NOT NULL,
FOREIGN KEY (character_id) REFERENCES user_characters (id),
FOREIGN KEY (playlist_id) REFERENCES playlists (id)
)

-- migrate:down

DROP TABLE reviews;