-- migrate:up

INSERT INTO like_songs (user_id, song_id) 
VALUES
(1,1),
(2,4),
(3,6),
(4,6),
(5,6),
(6,6),
(2,6),
(1,6),
(5,8),
(6,8),
(3,8),
(2,8),
(1,8),
(4,8),
(6,9),
(3,9);

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE like_songs;
SET FOREIGN_KEY_CHECKS = 1;
