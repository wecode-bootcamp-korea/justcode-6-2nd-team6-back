-- migrate:up

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE VIEW playlistSlide AS 
SELECT 
p.id AS playlistId,
p.name AS playlistTitle,
DATE_FORMAT(p.created_at, '%Y.%m.%d') AS createdDate,
psc.playlistSongsCount AS playlistSongsCount,
a.album_image AS albumImage,
s.id AS songId,
s.name AS songTitle,
ats.name AS artist
FROM playlists AS p
LEFT JOIN playlists_songs AS ps ON ps.playlist_id = p.id
LEFT JOIN songs AS s ON ps.song_id = s.id
LEFT JOIN playlistSongsCount AS psc ON p.id = psc.playlistId
LEFT JOIN albums AS a ON s.album_id = a.id
LEFT JOIN artists AS ats ON a.artist_id = ats.id;

-- migrate:down

DROP VIEW playlistSlide;