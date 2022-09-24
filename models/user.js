const { myDataSource } = require("./typeorm-client");

const createUser = async (email, hashedPw, name, phone, birth) => {
  const user = await myDataSource.query(
    `INSERT INTO 
     users(email, password, name, phone, birth)
     VALUES (?, ?, ?, ?, ?)`,
    [email, hashedPw, name, phone, birth],
  );
  /* 
  const user = await myDataSource.query(
    `INSERT INTO 
     user_characters(user_id, name, profile_image)
     VALUES ( 
      ( SELECT u.id 
        FROM users u 
        ORDER BY u.id DESC 
        LIMIT 1),
       "캐릭터1",
       "https://cdn.pixabay.com/photo/2022/02/20/22/11/background-7025417_1280.png")`,
  );
 */
  return user;
};

const userExisted = async (phone) => {
  const [user] = await myDataSource.query(
    `SELECT id, email, name, phone
    FROM users WHERE phone = ?`,
    [phone],
  );
  return user;
};

const selectUser = async (email) => {
  const [selectUser] = await myDataSource.query(
    `SELECT id, email, password
    FROM users
    WHERE email = ?`,
    [email],
  );
  return selectUser;
};

const getUserCharacter = async (userId) => {
  const selectUser = await myDataSource.query(
    `SELECT u.id, c.name, c.profile_image
    FROM users u
    JOIN user_characters c ON c.user_id = u.id
    WHERE u.id = ?`,
    [userId],
  );
  return selectUser;
};

module.exports = {
  createUser,
  userExisted,
  selectUser,
  getUserCharacter,
};
