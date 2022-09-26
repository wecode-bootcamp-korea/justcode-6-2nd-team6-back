-- migrate:up

INSERT INTO 
playlists (user_id, name)
VALUES
(1, '가을을 기다리는 발라드'),
(1, '가사에 조용히 귀 기울여 듣는 발라드'),
(1, '가을과 어울리는 편안한 감성 모음'),
(2, '둠칫둠칫 그루브 일렉트로닉'),
(2, '2022.09.20의 플레이리스트'),
(3, '비오는 날 듣기 좋은 노래 모음'),
(4, '편백숲에서 선물받는 힐링'),
(5, '높고 푸른 하늘과 바다와 물고기'),
(6, '파란색이 생각나는 플레이리스트'),
(6, '작은 동물과 함께하는 오후의 티타임'),
(6, '비내리는 새벽 감성 모음'),
(1, '요리하면서 듣기 좋은 맛있는 노래 모음'),
(2, '네일아트 하면서 듣는 노래'),
(3, '플레이어 1의 샤워송 모음'),
(4, '작업효율 최상 한국인의 노동요');

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE playlists;
SET FOREIGN_KEY_CHECKS = 1;
