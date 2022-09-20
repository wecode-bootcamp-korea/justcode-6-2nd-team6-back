-- migrate:up

INSERT INTO 
management_companies (name)
VALUES ("NCS Release");

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE management_companies;
SET FOREIGN_KEY_CHECKS = 1;
