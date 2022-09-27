-- migrate:up

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE VIEW songPlayCountSum AS 
SELECT song_id,sum(play_count) AS total_count FROM play_counts GROUP BY song_id;

-- migrate:down

DROP VIEW songPlayCountSum;