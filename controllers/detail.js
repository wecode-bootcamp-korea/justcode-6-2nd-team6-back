const detailService = require("../services/detail");

const getTrackDetail = async (req, res) => {
  const songId = req.params.id;
  try {
    const result = await detailService.getTrackDetail(songId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code).json(err.message);
  }
};
//앨범 장르, 소개는 빼고
const getAlbumDetail = async (req, res) => {
  const albumId = req.params.id;
  const page = req.params.page;
  try {
    if (page === "details") {
      const result = await detailService.getAlbumDetail(albumId);
      res.status(200).json(result);
    } else if (page === "tracklist") {
      const result = await detailService.getAlbumTracklist(albumId);
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (err) {
    console.log(err);
    res.status(err.code).json(err.message);
  }
};

const getPlaylistDetail = async (req, res) => {
  const playlistId = req.params.id;
  try {
    const result = await detailService.getPlaylistDetail(playlistId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code).json(err.message);
  }
};

const getMylistDetail = async (req, res) => {
  const token = req.headers.authorization.substring(7);
  const playlistId = req.params.id;
  try {
    const result = await detailService.getMylistDetail(playlistId, token);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code).json(err.message);
  }
};

const getArtistDetail = async (req, res) => {
  const artistId = req.params.id;
  const page = req.params.page;
  const { sortType, roleType } = req.query;
  let sortCloumn;
  let isDESCorASC;
  try {
    if (page === "songs") {
      switch (sortType) {
        case "POPULARITY":
          sortCloumn = "songPlayCount";
          isDESCorASC = " DESC";
          break;
        case "RECENT":
          sortCloumn = "albumReleaseDate";
          isDESCorASC = "ASC";
          break;
        case "WORD":
          sortCloumn = "songTitle";
          isDESCorASC = "ASC";
          break;
        default:
          res.status(404).json("Not Found");
      }
      const result = await detailService.getArtistSongs(
        artistId,
        sortCloumn,
        isDESCorASC,
        roleType,
      );
      res.status(200).json(result);
    } else if (page === "albums") {
      switch (sortType) {
        case "POPULARITY":
          sortCloumn = "albumPlayCount";
          isDESCorASC = "DESC";
          break;
        case "RECENT":
          sortCloumn = "albumReleaseDate";
          isDESCorASC = "ASC";
          break;
        case "WORD":
          sortCloumn = "albumTitle";
          isDESCorASC = "ASC";
          break;
        default:
          res.status(404).json("Not Found");
      }
      const result = await detailService.getArtistAlbums(
        artistId,
        sortCloumn,
        isDESCorASC,
        roleType,
      );
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (err) {
    console.log(err);
    res.status(err.code).json(err.message);
  }
};

module.exports = {
  getTrackDetail,
  getAlbumDetail,
  getPlaylistDetail,
  getMylistDetail,
  getArtistDetail,
};
