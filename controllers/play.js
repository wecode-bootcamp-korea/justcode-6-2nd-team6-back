const playService = require("../services/play");

const isLiked = async (req, res) => {
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
};

const getPlayData = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await playService.getSongData(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
  }
};

module.exports = {
  isLiked,
  getPlayData,
};
