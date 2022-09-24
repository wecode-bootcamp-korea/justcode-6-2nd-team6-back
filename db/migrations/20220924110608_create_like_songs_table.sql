-- migrate:up

CREATE TABLE like_songs (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
song_id INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (song_id) REFERENCES songs (id)
)

-- migrate:down

DROP TABLE like_songs;