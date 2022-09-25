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

const getPlaylistSongsData = async (userId, playlistId) => {
  await playDao.isUserPlaylistVaild(userId, playlistId);
  const result = await playDao.getPlaylistSongsDataById(playlistId);
  return result;
};

const isLiked = async (userId, songId) => {
  const result = await playDao.isLiked(userId, songId);
  return result;
};

const getSongData = async (songId, token) => {
  await playDao.isSongIdVaild(songId);
  if (token) {
    const userId = await getUserId(token);
    await playDao.updatePlayCount(userId, songId);
  }
  const result = await playDao.getSongDataById(songId);
  return result;
};

module.exports = {
  getUserId,
  getPlaylistSongsData,
  isLiked,
  getSongData,
};
