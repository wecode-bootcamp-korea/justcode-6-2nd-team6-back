const { myDataSource } = require("./typeorm-client");

//아이디 유효성 확인 (존재하는 값인지)
const isIdVaild = async (id, table) => {
  const result = await myDataSource.query(
    `SELECT EXISTS (SELECT * FROM ?? WHERE id=?) as isExist`,
    [table, id],
  );
  const isExist = Object.values(JSON.parse(JSON.stringify(result)))[0].isExist;
  if (isExist == 1) {
    return;
  } else {
    let error = new Error("Error: No Data");
    error.code = 204;
    throw error;
  }
};

const getTrackDetailBysongId = async (songId) => {
  const result = await myDataSource.query(
    `SELECT * FROM songDetail WHERE id=?`,
    [songId],
  );
  return result;
};

const getAlbumDetailByAlbumId = async (albumId) => {
  await myDataSource.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
  );
  const result = await myDataSource.query(
    `SELECT * FROM albumDetail WHERE id = ?`,
    [albumId],
  );
  return result;
};

const getAlbumTracklistByAlbumId = async (albumId) => {
  await myDataSource.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
  );
  let result = {};
  result.albumInfo = await myDataSource.query(
    `SELECT id, albumTitle, artist, albumType, albumImage, albumReleaseDate, albumType FROM albumDetail WHERE id = ?`,
    [albumId],
  );
  result.albumSongs = await myDataSource.query(
    `SELECT * FROM albumTracklist WHERE albumId = ?`,
    [albumId],
  );
  return result;
};

const getUserIdByplaylistId = async (playlistId) => {
  const characterId = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT character_id FROM playlists WHERE id = ?`,
          [playlistId],
        ),
      ),
    ),
  )[0].character_id;
  const userId = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT user_id FROM user_characters WHERE id = ?`,
          [characterId],
        ),
      ),
    ),
  )[0].user_id;
  return userId;
};

const getPlaylistDetailByPlaylistId = async (playlistId) => {
  await myDataSource.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
  );
  let result = {};
  result.playlistInfo = await myDataSource.query(
    `SELECT * FROM playlistDetail WHERE playlistId = ?`,
    [playlistId],
  );
  result.playlistSongs = await myDataSource.query(
    `SELECT * FROM playlistSongs WHERE playlistId = ?`,
    [playlistId],
  );
  return result;
};

const getArtistSongsByArtistId = async (
  artistId,
  sortCloumn,
  isDESCorASC,
  roleType,
) => {
  await myDataSource.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
  );
  let result = {};
  result.artistInfo = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT artistId, artistName, artistImage, artistType, artistGenre FROM artistDetail WHERE artistId = ? GROUP BY artistId`,
          [artistId],
        ),
      ),
    ),
  )[0];
  switch (roleType) {
    case "ALL":
      result.artistSongs = await myDataSource.query(
        `SELECT artistId, artistName, albumId, albumTitle, albumImage, songId, songTitle, songPlayCount FROM artistDetail
        WHERE (artistId = ?) GROUP BY songId ORDER BY ${sortCloumn} ${isDESCorASC}`,
        [artistId],
      );
      break;
    case "RELEASE":
      result.artistSongs = await myDataSource.query(
        `SELECT artistId, artistName, albumId, albumTitle, albumImage, songId, songTitle, songPlayCount FROM artistDetail 
        WHERE (artistId = ? AND albumType IN ("정규", "싱글", "미니")) GROUP BY songId ORDER BY ${sortCloumn} ${isDESCorASC}`,
        [artistId],
      );
      break;
    case "JOIN":
      result.artistSongs = await myDataSource.query(
        `SELECT artistId, artistName, albumId, albumTitle, albumImage, songId, songTitle, songPlayCount FROM artistDetail 
        WHERE (artistId = ? AND NOT albumType IN ("정규", "싱글", "미니")) GROUP BY songId ORDER BY ${sortCloumn} ${isDESCorASC}`,
        [artistId],
      );
      break;
    default:
      let error = new Error("Not Found");
      error.code = 404;
      throw error;
  }
  return result;
};

const getArtistAlbumsByArtistId = async (
  artistId,
  sortCloumn,
  isDESCorASC,
  roleType,
) => {
  await myDataSource.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
  );
  let result = {};
  result.artistInfo = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT artistId, artistName, artistImage, artistType, artistGenre FROM artistDetail WHERE artistId = ? GROUP BY artistId`,
          [artistId],
        ),
      ),
    ),
  )[0];

  switch (roleType) {
    case "ALL":
      result.artistSongs = await myDataSource.query(
        `SELECT artistId, artistName, albumId, albumTitle, albumImage, albumReleaseDate, albumType, albumPlayCount FROM artistDetail 
        WHERE (artistId = ?) GROUP BY albumId ORDER BY ${sortCloumn} ${isDESCorASC}`,
        [artistId],
      );
      break;
    case "RELEASE":
      result.artistSongs = await myDataSource.query(
        `SELECT artistId, artistName, albumId, albumTitle, albumImage, albumReleaseDate, albumType, albumPlayCount FROM artistDetail 
        WHERE (artistId = ? AND albumType IN ("정규", "싱글", "미니")) GROUP BY albumId ORDER BY ${sortCloumn} ${isDESCorASC}`,
        [artistId],
      );
      break;
    case "JOIN":
      result.artistSongs = await myDataSource.query(
        `SELECT artistId, artistName, albumId, albumTitle, albumImage, albumReleaseDate, albumType, albumPlayCount FROM artistDetail 
        WHERE (artistId = ? AND NOT albumType IN ("정규", "싱글", "미니")) GROUP BY albumId ORDER BY ${sortCloumn} ${isDESCorASC}`,
        [artistId],
      );
      break;
    default:
      let error = new Error("Not Found");
      error.code = 404;
      throw error;
  }
  return result;
};

module.exports = {
  isIdVaild,
  getTrackDetailBysongId,
  getAlbumDetailByAlbumId,
  getAlbumTracklistByAlbumId,
  getUserIdByplaylistId,
  getPlaylistDetailByPlaylistId,
  getArtistSongsByArtistId,
  getArtistAlbumsByArtistId,
};
