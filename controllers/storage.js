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

const deletePlaylist = async (req, res) => {
  const { id } = req.findUser;
  const { playlistId } = req.body;

  if (!id) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  if (!playlistId) {
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }

  try {
    await storageService.deletePlaylist(playlistId);
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
  getUserPlaylist,
  createPlaylist,
  deletePlaylist,
  getStorage,
};
