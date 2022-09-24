-- migrate:up

CREATE TABLE play_counts (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
song_id INT NOT NULL,
play_count INT NOT NULL,
updated_at DATETIME,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (song_id) REFERENCES songs (id)
)

-- migrate:down

DROP TABLE play_counts;