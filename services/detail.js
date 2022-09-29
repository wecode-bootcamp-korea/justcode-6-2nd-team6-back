const detailDao = require("../models/detail");
const jwt = require("jsonwebtoken");

const getTrackDetail = async (songId) => {
  await detailDao.isIdVaild(songId, "songs");
  const result = await detailDao.getTrackDetailBysongId(songId);
  return result;
};

const getAlbumDetail = async (albumId) => {
  await detailDao.isIdVaild(albumId, "albums");
  const result = await detailDao.getAlbumDetailByAlbumId(albumId);
  return result;
};

const getAlbumTracklist = async (albumId) => {
  await detailDao.isIdVaild(albumId, "albums");
  const result = await detailDao.getAlbumTracklistByAlbumId(albumId);
  return result;
};

const getPlaylistDetail = async (playlistId) => {
  await detailDao.isIdVaild(playlistId, "playlists");
  const result = await detailDao.getPlaylistDetailByPlaylistId(playlistId);
  return result;
};

const getMylistDetail = async (playlistId, token) => {
  await detailDao.isIdVaild(playlistId, "playlists");
  //playlistId를 통해 유저 아이디 가져오기
  const userIdWhoOwnPlaylist = await detailDao.getUserIdByplaylistId(
    playlistId,
  );
  //토큰에서 아이디 가져오기
  let userId;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      let error = new Error("Error: Invaild Access");
      error.code = 403;
      throw error;
    } else {
      userId = decoded.userId;
    }
  });
  //토큰에서 가져온 유저 아이디가 플레이리스트 소유자와 같을 경우 mylist로 불러오기 / 아닌 경우 접근 권한 에러
  if (userId === userIdWhoOwnPlaylist) {
    const result = await detailDao.getPlaylistDetailByPlaylistId(playlistId);
    return result;
  } else {
    let error = new Error("Error: 접근 권한이 없습니다.");
    error.code = 403;
    throw error;
  }
};

const getArtistSongs = async (artistId, sortCloumn, isDESCorASC, roleType) => {
  await detailDao.isIdVaild(artistId, "artists");
  const result = await detailDao.getArtistSongsByArtistId(
    artistId,
    sortCloumn,
    isDESCorASC,
    roleType,
  );
  return result;
};
const getArtistAlbums = async (artistId, sortCloumn, isDESCorASC, roleType) => {
  await detailDao.isIdVaild(artistId, "artists");
  const result = await detailDao.getArtistAlbumsByArtistId(
    artistId,
    sortCloumn,
    isDESCorASC,
    roleType,
  );
  return result;
};

const getArtistSongsAndAlbums = async (artistId) => {
  await detailDao.isIdVaild(artistId, "artists");
  const result = await detailDao.getArtistSongsAndAlbumsByArtistId(artistId);
  return result;
};

const createPlaylistSongs = async (playlistId, songId) => {
  return await detailDao.createPlaylistSongs(playlistId, songId);
};

const editPlaylistTitle = async (newTitle, playlistId) => {
  return await detailDao.editPlaylistTitle(newTitle, playlistId);
};

const deletePlaylistSong = async (playlistId, songId) => {
  return await detailDao.deletePlaylistSong(playlistId, songId);
};

module.exports = {
  getTrackDetail,
  getAlbumDetail,
  getAlbumTracklist,
  getPlaylistDetail,
  getMylistDetail,
  getArtistSongs,
  getArtistAlbums,
  createPlaylistSongs,
  editPlaylistTitle,
  deletePlaylistSong,
  getArtistSongsAndAlbums,
};
