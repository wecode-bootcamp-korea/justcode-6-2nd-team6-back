const playService = require("../services/play");

const getSongsData = async (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  if (!req.headers["authorization"]) {
    res.status(200).json({ message: "please_login" });
  } else {
    const token = req.headers["authorization"];
    try {
      const userId = await playService.getUserId(token);
      const canPlay = await playService.canPlay(userId);
      if (canPlay == 1) {
        let result;
        switch (type) {
          case "playlist":
            result = await playService.getPlaylistSongsData(id);
            break;
          case "artist":
            result = await playService.getArtistSongsData(id);
            break;
          case "genre":
            result = await playService.getGenreSongsData(id);
            break;
          case "song":
            result = await playService.getSongData(id);
            break;
          case "liketrack":
            result = await playService.getLikedSongsData(userId);
            break;
          case "mostlisten":
            result = await playService.getMostListenSongsData(userId);
            break;
          case "recentlisten":
            result = await playService.getRecentListenSongsData(userId);
            break;
          case "popular":
            result = await playService.getPopularSongsData();
            break;
          case "albumtrack":
            result = await playService.getAlbumSongsData(id);
            break;
          default:
            res.status(404).json("Not Found");
        }
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "Need Voucher" });
      }
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ message: err.message });
    }
  }
};

const play = async (req, res) => {
  if (!req.headers["authorization"]) {
    res.status(200).json({ message: "please_login" });
  } else {
    const token = req.headers["authorization"];
    const songId = req.params.id;
    try {
      const userId = await playService.getUserId(token);
      let result = await playService.play(userId, songId);
      result.canPlay = await playService.canPlay(userId);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json(err.message);
    }
  }
};

module.exports = {
  getSongsData,
  play,
};
