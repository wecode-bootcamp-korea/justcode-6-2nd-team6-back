const storageService = require("../services/storage");

const getUserPlaylist = async (req, res) => {
  const { userId } = req.findUser;

  if (!userId) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  try {
    const playlist = await storageService.getUserPlaylist(userId);
    res.status(201).json({ data: playlist });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const createPlaylist = async (req, res) => {
  const { userId } = req.findUser;
  const { title } = req.body;

  if (!userId) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  try {
    const playlist = await storageService.createPlaylist(userId, title);
    res.status(201).json({ data: playlist });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const deletePlaylist = async (req, res) => {
  const { userId } = req.findUser;
  const { playlistId } = req.body;

  if (!userId) {
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
  try {
    if (!req.headers["authorization"]) {
      let error = new Error("Error: please_login");
      error.code = 200;
      throw error;
    } else {
      const token = req.headers["authorization"];
      const userId = await storageService.getuserId(token);
      switch (page) {
        case "liketrack":
          result = await storageService.getLikedSongs(userId);
          res.status(200).json(result);
          break;
        case "mostlisten":
          result = await storageService.getMostListen(userId);
          res.status(200).json(result);
          break;
        case "recentlisten":
          result = await storageService.getRecentListen(userId);
          res.status(200).json(result);
          break;
        default:
          res.status(404).json({ message: "Wrong Direction" });
          break;
      }
    }
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
  }
};

module.exports = {
  getUserPlaylist,
  createPlaylist,
  deletePlaylist,
  getStorage,
};
