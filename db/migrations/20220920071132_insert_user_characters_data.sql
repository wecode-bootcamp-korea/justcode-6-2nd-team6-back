-- migrate:up

INSERT INTO 
user_characters (user_id, name)
VALUES
(1, '김코드'),
(2, '리코더'),
(3, '댄스'),
(3, '발라드'),
(4, '강데이터'),
(5, '최쿼리'),
(5, '서브쿼리'),
(5, 'query'),
(6, '버그');
-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE user_characters;
SET FOREIGN_KEY_CHECKS = 1;
