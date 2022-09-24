const storageDao = require("../models/storage");
const jwt = require("jsonwebtoken");

const getuserId = async (token) => {
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

const getMyList = async (userId) => {
  const result = await storageDao.getMyListByUserId(userId);
  return result;
};

const getLikedSongs = async (userId) => {
  const result = await storageDao.getLikedSongsByUserId(userId);
  return result;
};

const getMostListen = async (userId) => {
  const result = await storageDao.getMostListenByUserId(userId);
  return result;
};

const getRecentListen = async (userId) => {
  const result = await storageDao.getRecentListenByUserId(userId);
  return result;
};

module.exports = {
  getuserId,
  getMyList,
  getLikedSongs,
  getMostListen,
  getRecentListen,
};
