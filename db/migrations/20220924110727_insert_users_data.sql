-- migrate:up

INSERT INTO 
users (email, password, name, birth, phone)
VALUES
("codekim@coder.com","$2a$15$An1JzDSZn3KqIKoAZaOWwO1AEk2xM0Ni/0hEsMviYZwN5vy7FBZiu","Kimcode","35661","010-0000-0000"),
("lee@coder.com","$2a$15$YkyQiokQ7Ky3P4l0SmvGf.CvbeXPTZv2vxQbsbagVqHN.1u7xg416","Leecoder","32796","010-0000-0000"),
("shimi@coder.com","$2a$12$NbGc.TORrOoBgXdkuGjQO.Cs3vKG2ySoaSxsKdJtFKbc/.A3lO3a6","Shimvalues",null,"010-0000-0000"),
("k_data@coder.com","$2a$12$DtHH0wzrRavisNEDTieRAOm9NfKdC0lVWZTI2j/Q1XxUIVggPRd8.","Kangdata",null,"010-0000-0000"),
("quwrychoi@coder.com","$2a$12$pfsL7kI7N/e8pFkj2lIys.yBeGYxEm6cAQoQIfyywUi1qLWQx7AHy","Choiquery","37652","010-0000-0000"),
("nobug@coder.com","$2a$12$5H2rUDq.gBok5nMVQ6yFDOjoaCgDWV7h5MsTi4PPSk1ejw2oyEhzS","Jodebug","39232","010-0000-0000")

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE users;
SET FOREIGN_KEY_CHECKS = 1;
