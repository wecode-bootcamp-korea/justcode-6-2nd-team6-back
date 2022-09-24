-- migrate:up

INSERT INTO 
management_companies (name)
VALUES ("Copyright Free");

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE management_companies;
SET FOREIGN_KEY_CHECKS = 1;
