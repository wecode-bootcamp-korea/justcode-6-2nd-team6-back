const { myDataSource } = require("./typeorm-client");

const createUser = async (email, hashedPw, name, phone, birth) => {
  const user = await myDataSource.query(
    `INSERT INTO 
     users(email, password, name, phone, birth)
     VALUES (?, ?, ?, ?, ?)`,
    [email, hashedPw, name, phone, birth],
  );
  return user;
};

const userExisted = async (phone) => {
  const user = await myDataSource.query(
    `SELECT id, email, name, phone 
    FROM users WHERE phone = ?`,
    [phone],
  );
  return user;
};

const selectUser = async (email) => {
  const selectUser = await myDataSource.query(
    `SELECT id, email, password
    FROM users
    WHERE email = ?`,
    [email],
  );
  return selectUser;
};

module.exports = { createUser, userExisted, selectUser };
