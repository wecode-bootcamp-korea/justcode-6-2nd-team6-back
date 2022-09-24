-- migrate:up

INSERT INTO reviews (user_id, comment, playlist_id) 
VALUES
(1, "노래 좋아요~~", 1),
(2, "노래 좋아요~", 1),
(3, "노래 좋아요!", 1);

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE reviews;
SET FOREIGN_KEY_CHECKS = 1;
