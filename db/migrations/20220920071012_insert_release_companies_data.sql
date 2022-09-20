-- migrate:up

INSERT INTO 
release_companies (name)
VALUES ("NCS Release");

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE release_companies;
SET FOREIGN_KEY_CHECKS = 1;
