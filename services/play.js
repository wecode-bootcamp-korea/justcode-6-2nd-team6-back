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

const canPlay = async (userId) => {
  const result = await playDao.hasVoucher(userId);
  return result;
};

const getPlaylistSongsData = async (userId, playlistId) => {
  await playDao.isUserPlaylistVaild(userId, playlistId);
  const result = await playDao.getPlaylistSongsDataById(playlistId);
  return result;
};

const getArtistSongsData = async (songId) => {
  await playDao.isSongIdVaild(songId);
  const result = await playDao.getArtistSongsDataBySongId(songId);
  return result;
};

const getGenreSongsData = async (songId) => {
  await playDao.isSongIdVaild(songId);
  const result = await playDao.getGenreSongsDataBySongId(songId);
  return result;
};

const play = async (songId, token) => {
  await playDao.isSongIdVaild(songId);
  const userId = await getUserId(token);
  await playDao.updatePlayCount(userId, songId);
  const result = await playDao.isLiked(userId, songId);
  return result;
};

module.exports = {
  getUserId,
  canPlay,
  getArtistSongsData,
  getGenreSongsData,
  getPlaylistSongsData,
  play,
};
