-- migrate:up

CREATE TABLE playlists_songs (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
playlist_id INT NOT NULL,
song_id INT NOT NULL,
FOREIGN KEY (playlist_id) REFERENCES playlists (id),
FOREIGN KEY (song_id) REFERENCES songs (id)
)

-- migrate:down

DROP TABLE playlists_songs;