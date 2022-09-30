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
  if (!userId) {
    let error = new Error("Error: 유저 아이디가 없습니다.");
    error.code = 403;
    throw error;
  }
  return userId;
};

const canPlay = async (userId) => {
  const result = await playDao.hasVoucher(userId);
  return result;
};

const getPlaylistSongsData = async (playlistId) => {
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

const getSongData = async (songId) => {
  await playDao.isSongIdVaild(songId);
  const result = await playDao.getSongDataBySongId(songId);
  return result;
};

const getLikedSongsData = async (userId) => {
  const result = await playDao.getlikedSongsDataByUserId(userId);
  return result;
};

const getMostListenSongsData = async (userId) => {
  const result = await playDao.getMostListenSongsDataByUserId(userId);
  return result;
};

const getRecentListenSongsData = async (userId) => {
  const result = await playDao.getRecentListenSongsDataByUserId(userId);
  return result;
};

const getPopularSongsData = async () => {
  const result = await playDao.getPopularSongsData();
  return result;
};

const getAlbumSongsData = async (albumId) => {
  const result = await playDao.getAlbumSongsDataByAlbumId(albumId);
  return result;
};

const play = async (userId, songId) => {
  await playDao.isSongIdVaild(songId);
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
  getSongData,
  play,
  getLikedSongsData,
  getMostListenSongsData,
  getRecentListenSongsData,
  getPopularSongsData,
  getAlbumSongsData,
};
