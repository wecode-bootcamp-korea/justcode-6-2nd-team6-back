const storageDao = require("../models/storage");
const jwt = require("jsonwebtoken");

const getUserPlaylist = async (userId) => {
  return await storageDao.getUserPlaylist(userId);
};

const createPlaylist = async (userId, title) => {
  return await storageDao.createPlaylist(userId, title);
};

const createPlaylistSongs = async (playlistId, songId) => {
  return await storageDao.createPlaylistSongs(playlistId, songId);
};

const editPlaylistTitle = async (newTitle, playlistId) => {
  return await storageDao.editPlaylistTitle(newTitle, playlistId);
};

const deletePlaylist = async (playlistId, playlistSongId) => {
  const playlistOrSong = deleted(playlistId, playlistSongId);

  return await storageDao.deletePlaylist(playlistOrSong);
};

const deleted = (playlistId, playlistSongId) => {
  const Deleted = {
    song: `DELETE FROM playlists_songs WHERE id = ${playlistSongId}`,
    playlist: `DELETE FROM playlists WHERE id = ${playlistId}`,
  };

  if (playlistSongId) {
    return Deleted.song;
  } else if (playlistId) {
    return Deleted.playlist;
  }
  return null;
};

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
  getUserPlaylist,
  createPlaylist,
  createPlaylistSongs,
  editPlaylistTitle,
  deletePlaylist,
  getuserId,
  getMyList,
  getLikedSongs,
  getMostListen,
  getRecentListen,
};
