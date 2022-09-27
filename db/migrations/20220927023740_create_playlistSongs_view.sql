-- migrate:up

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE VIEW playlistSongs AS 
SELECT 
p.id AS playlistId,
s.id AS songId,
s.name AS songTitle,
s.content AS content,
a.id AS albumId,
a.name AS albumTitle, 
a.album_image AS albumImage,
ats.id AS atsId,
ats.name AS artist
FROM playlists AS p
LEFT JOIN playlists_songs AS ps ON ps.playlist_id = p.id
LEFT JOIN songs AS s ON ps.song_id = s.id
LEFT JOIN playlistSongsCount AS psc ON p.id = psc.playlistId
LEFT JOIN albums AS a ON s.album_id = a.id
LEFT JOIN artists AS ats ON a.artist_id = ats.id
ORDER BY p.id ASC;

-- migrate:down

DROP VIEW playlistSongs;