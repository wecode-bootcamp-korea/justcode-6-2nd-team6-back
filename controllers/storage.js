const storageService = require("../services/storage");

const getUserPlaylist = async (req, res) => {
  const { id } = req.findUser;

  if (!id) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  try {
    const playlist = await storageService.getUserPlaylist(id);
    res.status(201).json({ data: playlist });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const createPlaylist = async (req, res) => {
  const { id } = req.findUser;
  const { title } = req.body;

  if (!id) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  try {
    const playlist = await storageService.createPlaylist(id, title);
    res.status(201).json({ data: playlist });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const createPlaylistSongs = async (req, res) => {
  const { id } = req.findUser;
  const { playlistId, songId } = req.body;

  if (!id) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  if (!playlistId || !songId) {
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }

  try {
    await storageService.createPlaylistSongs(playlistId, songId);
    res.status(201).json({ message: "PLAYLIST_SONGS_CREATED" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const editPlaylistTitle = async (req, res) => {
  const { id } = req.findUser;
  const { newTitle } = req.body;
  const { playlistId } = req.params;

  if (!id) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  if (!newTitle) {
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }

  try {
    await storageService.editPlaylistTitle(newTitle, playlistId);
    res.status(201).json({ message: "TITLE_EDIT_SUCCESS" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const deletePlaylist = async (req, res) => {
  const { id } = req.findUser;
  const { playlistId, playlistSongId } = req.body;

  if (!id) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  if (!(playlistId || playlistSongId)) {
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }

  try {
    await storageService.deletePlaylist(playlistId, playlistSongId);
    res.status(204).json({ message: "PLAYLIST_DELETED" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

module.exports = {
  getUserPlaylist,
  createPlaylist,
  createPlaylistSongs,
  editPlaylistTitle,
  deletePlaylist,
};
