-- migrate:up

CREATE TABLE playlists_songs (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
playlist_id INT NOT NULL,
song_id INT NOT NULL,
FOREIGN KEY (song_id) REFERENCES songs (id),
FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
CONSTRAINT PK_playlists_songs_playlist_id_song_id UNIQUE KEY (playlist_id, song_id)
)

-- migrate:down

DROP TABLE playlists_songs;