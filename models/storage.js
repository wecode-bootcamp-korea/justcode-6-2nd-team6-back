const { myDataSource } = require("./typeorm-client");

//유저 플리 조회
const getUserPlaylist = async (userId) => {
  await myDataSource.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
  );
  const userPlaylist = await myDataSource.query(
    `SELECT
      p.user_id AS userId,
      p.id AS playlistId,
      p.name AS title,
      count(s.id) AS songTotalCount,
      b.album_image AS albumImage,
      DATE_FORMAT(p.created_at, '%Y.%m.%d') AS createdAt
    FROM playlists p
    LEFT OUTER JOIN playlists_songs s ON s.playlist_id = p.id
    LEFT OUTER JOIN (
      SELECT songs.id, a.album_image
      FROM songs
      JOIN albums a ON a.id = songs.album_id
      ) b ON s.song_id = b.id
    WHERE p.user_id = ?
    GROUP BY p.id`,
    [userId],
  );
  return userPlaylist;
};

//플리 추가
const createPlaylist = async (userId, title) => {
  await myDataSource.query(
    `INSERT INTO playlists (user_id, name)
    VALUES (?, DATE_FORMAT(now(), '%Y%m%d'))`,
    [userId, title],
  );
  const playlist = await myDataSource.query(
    `SELECT 
      id AS playlistId,
      user_id AS userId,
      name AS title,
      DATE_FORMAT(created_at, '%Y.%m.%d') AS createdAt
    FROM playlists 
    WHERE user_id = ?
    ORDER BY created_at DESC 
    LIMIT 1`,
    [userId],
  );
  return playlist;
};

//플리 삭제
const deletePlaylist = async (playlistId) => {
  return await myDataSource.query(
    `
  DELETE FROM playlists WHERE id IN (${playlistId
    .map((pID) => pID)
    .join(",")})`,
    [playlistId],
  );
};

const getLikedSongsByUserId = async (userId) => {
  const result = await myDataSource.query(
    `SELECT 
    sd.id AS songId,
    sd.songTitle AS songTitle,
    sd.songArtist AS songArtist,
    sd.artistId AS artistId,
    sd.albumId AS albumId,
    sd.albumTitle AS albumTitle,
    sd.albumCover AS albumCover
    FROM like_songs AS ls
    LEFT JOIN songDetail AS sd ON sd.id = ls.song_id
    WHERE ls.user_id = ?`,
    [userId],
  );
  return result;
};

const getMostListenByUserId = async (userId) => {
  const result = await myDataSource.query(
    `SELECT 
    sd.id AS songId,
    sd.songTitle AS songTitle,
    sd.songArtist AS songArtist,
    sd.artistId AS artistId,
    sd.albumId AS albumId,
    sd.albumTitle AS albumTitle,
    sd.albumCover AS albumCover
    FROM play_counts AS pc
    LEFT JOIN songDetail AS sd ON sd.id = pc.song_id
    WHERE pc.user_id = ?
    ORDER BY pc.play_count DESC`,
    [userId],
  );
  return result;
};

const getRecentListenByUserId = async (userId) => {
  const result = await myDataSource.query(
    `SELECT 
    sd.id AS songId,
    sd.songTitle AS songTitle,
    sd.songArtist AS songArtist,
    sd.artistId AS artistId,
    sd.albumId AS albumId,
    sd.albumTitle AS albumTitle,
    sd.albumCover AS albumCover
    FROM play_counts AS pc
    LEFT JOIN songDetail AS sd ON sd.id = pc.song_id
    WHERE pc.user_id = ?
    ORDER BY pc.updated_at DESC`,
    [userId],
  );
  return result;
};

module.exports = {
  getUserPlaylist,
  createPlaylist,
  deletePlaylist,
  getLikedSongsByUserId,
  getMostListenByUserId,
  getRecentListenByUserId,
};
