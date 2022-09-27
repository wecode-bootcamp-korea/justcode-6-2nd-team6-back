-- migrate:up

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE VIEW albumPlayCountSum AS 
SELECT album_id,sum(play_count) AS total_count 
FROM play_counts AS pc
LEFT JOIN songs AS s ON s.id = pc.song_id
LEFT JOIN albums AS a ON s.album_id = a.id 
GROUP BY album_id
ORDER BY album_id;

-- migrate:down

DROP VIEW albumPlayCountSum;