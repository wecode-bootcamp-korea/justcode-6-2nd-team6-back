-- migrate:up

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE VIEW albumTracklist AS 
SELECT 
a.id AS albumId,
a.album_image AS albumCover,
s.id AS songId,
s.track_number AS trackNumber,
s.name AS songTitle,
s.content AS content,
a.name AS albumTitle,
ats.id AS artistId,
ats.name AS artist,
s.is_title AS isTitle
FROM albums AS a
LEFT JOIN artists AS ats ON a.artist_id = ats.id
LEFT JOIN songs AS s ON s.album_id = a.id
GROUP BY s.id
ORDER BY album_id ASC, track_number ASC

-- migrate:down

DROP VIEW albumTracklist;