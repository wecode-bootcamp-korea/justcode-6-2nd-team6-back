-- migrate:up

INSERT INTO 
memberships (name, description, origin_price, benefit_price)
VALUES
('T멤버십 100원 6개월', '선택하신 T멤버십 혜택 타입과 사용 가능한 T플러스포인트에 따라 실제 결제금액이 변동될 수 있습니다.', 10.900, 0.1),
('T멤버십 100원 6개월', '선택하신 T멤버십 혜택 타입과 사용 가능한 T플러스포인트에 따라 실제 결제금액이 변동될 수 있습니다.', 7.900, 0.1),
('T멤버십 100원 6개월', '선택하신 T멤버십 혜택 타입과 사용 가능한 T플러스포인트에 따라 실제 결제금액이 변동될 수 있습니다.', 6.900, 0.1);

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE memberships;
SET FOREIGN_KEY_CHECKS = 1;
