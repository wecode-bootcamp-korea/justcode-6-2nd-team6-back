const storageDao = require("../models/storage");
const jwt = require("jsonwebtoken");

const getUserPlaylist = async (userId) => {
  return await storageDao.getUserPlaylist(userId);
};

const createPlaylist = async (userId, title) => {
  return await storageDao.createPlaylist(userId, title);
};

const deletePlaylist = async (playlistId) => {
  return await storageDao.deletePlaylist(playlistId);
};

//Beared Token을 userId로 변환
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
  getUserPlaylist,
  createPlaylist,
  deletePlaylist,
  getuserId,
  getLikedSongs,
  getMostListen,
  getRecentListen,
};
