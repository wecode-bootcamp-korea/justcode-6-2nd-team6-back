-- migrate:up

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE VIEW playlistSongsCount AS 
SELECT 
playlist_id AS playlistId,
count(id) AS playlistSongsCount
FROM
playlists_songs 
group by playlist_id;

-- migrate:down

DROP VIEW playlistSongsCount;