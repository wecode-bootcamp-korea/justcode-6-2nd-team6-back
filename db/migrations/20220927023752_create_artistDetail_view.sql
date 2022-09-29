-- migrate:up

CREATE VIEW artistDetail AS 
SELECT 
ats.id AS artistId,
ats.name AS artistName,
ats.artist_image AS artistImage,
ats.artist_type AS artistType,
g.name AS artistGenre,
a.id AS albumId,
a.name AS albumTitle,
a.album_type AS albumType,
DATE_FORMAT(a.release_date, '%Y.%m.%d') AS albumReleaseDate,
a.album_image AS albumImage,
apcs.total_count AS albumPlayCount,
s.id AS songId,
s.name AS songTitle,
spcs.total_count AS songPlayCount
FROM artists AS ats
LEFT JOIN albums AS a ON a.artist_id = ats.id
LEFT JOIN songs AS s ON s.album_id = a.id
LEFT JOIN songPlayCountSum AS spcs ON spcs.song_id = s.id
LEFT JOIN albumPlayCountSum AS apcs ON apcs.album_id = a.id
LEFT JOIN genres AS g ON ats.genre_id = g.id

-- migrate:down

DROP VIEW artistDetail;