const detailService = require("../services/detail");

const getTrackDetail = async (req, res) => {
  const songId = req.params.id;
  try {
    const result = await detailService.getTrackDetail(songId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
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
    res.status(err.code || 500).json(err.message);
  }
};

const getPlaylistDetail = async (req, res) => {
  const playlistId = req.params.id;
  try {
    const result = await detailService.getPlaylistDetail(playlistId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
  }
};

const getMylistDetail = async (req, res) => {
  const token = req.headers["authorization"];
  const playlistId = req.params.id;
  try {
    const result = await detailService.getMylistDetail(playlistId, token);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
  }
};

const getArtistDetail = async (req, res) => {
  try {
    const artistId = req.params.id;
    const page = req.params.page;
    const { sortType, roleType } = req.query;
    let sortCloumn;
    let isDESCorASC;
    let result;
    if (!page) {
      result = await detailService.getArtistSongsAndAlbums(artistId);
      res.status(200).json(result);
    } else if (page === "songs") {
      if (!sortType || !roleType) {
        let error = new Error("Error: Please enter sortType and roleType");
        error.code = 404;
        throw error;
      }
      switch (sortType) {
        case "POPULARITY":
          sortCloumn = "songPlayCount";
          isDESCorASC = " DESC";
          break;
        case "RECENT":
          sortCloumn = "albumReleaseDate";
          isDESCorASC = "DESC";
          break;
        case "WORD":
          sortCloumn = "songTitle";
          isDESCorASC = "ASC";
          break;
        default:
          let error = new Error("Not Found");
          error.code = 404;
          throw error;
      }
      result = await detailService.getArtistSongs(
        artistId,
        sortCloumn,
        isDESCorASC,
        roleType,
      );
      res.status(200).json(result);
    } else if (page === "albums") {
      if (!sortType || !roleType) {
        let error = new Error("Error: Please enter sortType and roleType");
        error.code = 404;
        throw error;
      }
      switch (sortType) {
        case "POPULARITY":
          sortCloumn = "albumPlayCount";
          isDESCorASC = "DESC";
          break;
        case "RECENT":
          sortCloumn = "albumReleaseDate";
          isDESCorASC = "DESC";
          break;
        case "WORD":
          sortCloumn = "albumTitle";
          isDESCorASC = "ASC";
          break;
        default:
          let error = new Error("Not Found");
          error.code = 404;
          throw error;
      }
      result = await detailService.getArtistAlbums(
        artistId,
        sortCloumn,
        isDESCorASC,
        roleType,
      );
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
  }
};

const createPlaylistSongs = async (req, res) => {
  const { userId } = req.findUser;
  const playlistId = req.params.id;
  const { songId } = req.body;

  if (!userId) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  if (!playlistId || !songId) {
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }

  try {
    await detailService.createPlaylistSongs(playlistId, songId);
    res.status(201).json({ message: "PLAYLIST_SONGS_CREATED" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const editPlaylistTitle = async (req, res) => {
  const { userId } = req.findUser;
  const playlistId = req.params.id;
  const { newTitle } = req.body;

  if (!userId) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  if (!newTitle) {
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }

  try {
    await detailService.editPlaylistTitle(newTitle, playlistId);
    res.status(201).json({ message: "TITLE_EDIT_SUCCESS" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const deletePlaylistSong = async (req, res) => {
  const { userId } = req.findUser;
  const playlistId = req.params.id;
  const { songId } = req.body;

  if (!userId) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  if (!(playlistId || songId)) {
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }

  try {
    await detailService.deletePlaylistSong(playlistId, songId);
    res.status(204).json({ message: "PLAYLIST_DELETED" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

module.exports = {
  getTrackDetail,
  getAlbumDetail,
  getPlaylistDetail,
  getMylistDetail,
  getArtistDetail,
  createPlaylistSongs,
  editPlaylistTitle,
  deletePlaylistSong,
};
