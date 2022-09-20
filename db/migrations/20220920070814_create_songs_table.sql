-- migrate:up

CREATE TABLE songs (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
track_number INT,
album_id INT NOT NULL,
name VARCHAR(3000),
content VARCHAR(2000),
lyrics_by VARCHAR(100),
music_by VARCHAR(100),
is_title TINYINT,
lyrics VARCHAR(5000),
genre_id INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (album_id) REFERENCES albums (id),
FOREIGN KEY (genre_id) REFERENCES genres (id)
)

-- migrate:down

DROP TABLE songs;