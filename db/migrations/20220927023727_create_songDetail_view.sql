-- migrate:up

CREATE VIEW songDetail AS 
SELECT 
s.id AS id,
s.name AS songTitle,
s.content AS content,
ats.id AS artistId,
ats.name AS songArtist,
a.id AS albumId,
a.name AS albumTitle,
a.album_image AS albumCover,
s.music_by AS musicBy,
s.lyrics_by AS lyricsBy,
s.lyrics AS lyrics
FROM songs AS s
LEFT JOIN albums AS a ON s.album_id = a.id
LEFT JOIN artists AS ats ON a.artist_id = ats.id

-- migrate:down

DROP VIEW songDetail;