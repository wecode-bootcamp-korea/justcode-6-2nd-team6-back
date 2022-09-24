const e = require("express");
const storageService = require("../services/storage");

// const getUserPlaylist = async (req, res) => {
//   const { id } = req.findUser;

//   if (!id) {
//     res.status(401).json({ message: "NEED_LOGIN" });
//     return;
//   }

//   try {
//     const playlist = await storageService.getUserPlaylist(id);
//     res.status(201).json({ data: playlist });
//   } catch (err) {
//     console.log(err);
//     res.status(err.statusCode || 500).json({ err: err.message });
//   }
// };

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

const getStorage = async (req, res) => {
  const page = req.params.page;
  if (!req.headers.authorization) {
    noToken();
  } else {
    try {
      const token = req.headers.authorization.substring(7);
      const userId = await storageService.getuserId(token);
      switch (page) {
        case "mylist":
          result = await storageService.getMyList(userId);
          break;
        case "liketrack":
          result = await storageService.getMostListen(userId);
          break;
        case "mostlisten":
          result = await storageService.getMostListen(userId);
          break;
        case "recentlisten":
          result = await storageService.getRecentListen(userId);
          break;
        default:
          res.status(404).json("Not Found");
          break;
      }
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json(err.message);
    }
  }
};

const noToken = async () => {
  res.status(200).json({ message: "please_login" });
};

module.exports = {
  //getUserPlaylist,
  createPlaylist,
  createPlaylistSongs,
  editPlaylistTitle,
  deletePlaylist,
  getStorage,
};
