-- migrate:up

INSERT INTO 
genres (name)
VALUES
('발라드'),
('팝'),
('댄스/일렉'),
('알앤비'),
('힙합'),
('트로트'),
('OST/BGM'),
('키즈'),
('인디클래식'),
('뉴에이지'),
('어쿠스틱'),
('일렉트로닉');

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE genres;
SET FOREIGN_KEY_CHECKS = 1;
