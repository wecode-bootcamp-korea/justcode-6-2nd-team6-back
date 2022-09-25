const playService = require("../services/play");

const getPlaylistSongsData = async (req, res) => {
  const playlistId = req.params.id;
  if (!req.headers.authorization) {
    res.status(200).json({ message: "please_login" });
  } else {
    const token = req.headers.authorization.substring(7);
    try {
      const userId = await playService.getUserId(token);
      const result = await playService.getPlaylistSongsData(userId, playlistId);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json(err.message);
    }
  }
};

const isLiked = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(200).json({ message: "please_login" });
  } else {
    const token = req.headers.authorization.substring(7);
    const songId = req.params.id;
    try {
      const userId = await playService.getUserId(token);
      const result = await playService.isLiked(userId, songId);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json(err.message);
    }
  }
};

const getPlayData = async (req, res) => {
  const token = req.headers.authorization.substring(7);
  const songId = req.params.id;
  console.log(token, songId);
  try {
    const result = await playService.getSongData(songId, token);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
  }
};

module.exports = {
  isLiked,
  getPlaylistSongsData,
  getPlayData,
};
