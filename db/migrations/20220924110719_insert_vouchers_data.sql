-- migrate:up

INSERT INTO 
vouchers (name, description, origin_price, sale_price, membership_id)
VALUES
("무제한 듣기+오프라인 재생","기기제한 없음, 무제한 스트리밍, 오프라인 재생",11.000,0.1,1),
("무제한 듣기","기기제한 없음, 무제한 스트리밍",8.000,0.1,2),
("300회 듣기","기기제한 없음, 횟수 제한",4.800,null,null),
("모바일 무제한 듣기","모바일 전용, 무제한 스트리밍",7.000,0.1,3);

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE vouchers;
SET FOREIGN_KEY_CHECKS = 1;
