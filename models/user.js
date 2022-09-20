const { myDataSource } = require("./typeorm-client");

const getUserByAccount = async (account) => {
  const [queryRes] = await myDataSource.query(
    `SELECT id, account, password FROM users WHERE account = ?`,
    [account],
  );
  return queryRes;
};

const getUserByPhone = async (phone) => {
  const [queryRes] = await myDataSource.query(
    `SELECT account FROM users WHERE phone = ?`,
    [phone],
  );
  return queryRes;
};

const createUser = async (account, hashedPw, name, phone, birth) => {
  const queryRes = await myDataSource.query(
    `INSERT INTO users(account, password, name, phone, birth) VALUES (?, ?, ?, ?, ?)`,
    [account, hashedPw, name, phone, birth],
  );
  return queryRes;
};

module.exports = { createUser, getUserByAccount, getUserByPhone };
