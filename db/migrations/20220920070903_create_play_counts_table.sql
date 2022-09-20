-- migrate:up

CREATE TABLE play_counts (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
character_id INT NOT NULL,
song_id INT NOT NULL,
play_count INT NOT NULL,
updated_at DATETIME,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (character_id) REFERENCES user_characters (id),
FOREIGN KEY (song_id) REFERENCES songs (id)
)

-- migrate:down

DROP TABLE play_counts;