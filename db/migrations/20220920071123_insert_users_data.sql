-- migrate:up

INSERT INTO 
users (account,password,name,birth,phone,voucher_id)
VALUES
('codekim@coder.com', 'Password1', 'Kimcode', '1997-08-19', '010-0000-0000', null),
('lee@coder.com', 'Password2', 'Leecoder', '1989-10-15', '010-0000-0000', 1),
('shimi@coder.com', 'Password3', 'Shimvalues', '', '010-0000-0000', null),
('k_data@coder.com', 'Password4', 'Kangdata', '', '010-0000-0000', 2),
('quwrychoi@coder.com', 'Password5', 'Choiquery', '2003-01-31', '010-0000-0000', 3),
('nobug@coder.com', 'Password6', 'Jodebug', '2007-05-30', '010-0000-0000', null);

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE users;
SET FOREIGN_KEY_CHECKS = 1;
