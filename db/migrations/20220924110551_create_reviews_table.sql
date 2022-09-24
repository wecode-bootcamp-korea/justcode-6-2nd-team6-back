-- migrate:up

CREATE TABLE reviews (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
comment VARCHAR(3000) NOT NULL,
playlist_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (playlist_id) REFERENCES playlists (id)
)

-- migrate:down

DROP TABLE reviews;