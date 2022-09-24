const playDao = require("../models/play");
const jwt = require("jsonwebtoken");

const getUserId = async (token) => {
  let userId;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      let error = new Error("Error: Invaild Access");
      error.code = 403;
      throw error;
    } else {
      userId = decoded.userId;
    }
  });
  return userId;
};

const isLiked = async (userId, songId) => {
  const result = await playDao.isLiked(userId, songId);
  return result;
};

const getSongData = async (id) => {
  await playDao.isSongIdVaild(id);
  const result = await playDao.getSongDataById(id);
  return result;
};

module.exports = {
  getUserId,
  isLiked,
  getSongData,
};
