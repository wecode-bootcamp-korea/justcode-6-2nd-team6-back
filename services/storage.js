const storageDao = require("../models/storage");

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

module.exports = {
  getUserPlaylist,
  createPlaylist,
  createPlaylistSongs,
  editPlaylistTitle,
  deletePlaylist,
};
