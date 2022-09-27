-- migrate:up

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE VIEW playlistDetail AS 
SELECT 
p.id AS playlistId,
p.user_id AS userId,
p.name AS playlistTitle,
psc.playlistSongsCount AS playlistSongsCount,
DATE_FORMAT(p.created_at, '%Y.%m.%d') AS createdDate,
s.id AS songId,
a.album_image AS albumImage
FROM playlists AS p
LEFT JOIN playlists_songs AS ps ON ps.playlist_id = p.id
LEFT JOIN songs AS s ON ps.song_id = s.id
LEFT JOIN playlistSongsCount AS psc ON p.id = psc.playlistId
LEFT JOIN albums AS a ON s.album_id = a.id
LEFT JOIN artists AS ats ON a.artist_id = ats.id
GROUP BY p.id
ORDER BY p.id ASC;

-- migrate:down

DROP VIEW playlistDetail;