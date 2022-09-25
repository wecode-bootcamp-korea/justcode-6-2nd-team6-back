const { myDataSource } = require("./typeorm-client");

//유저 플리 조회
const getUserPlaylist = async (userId) => {
  await myDataSource.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
  );
  const userPlaylist = await myDataSource.query(
    `SELECT
      p.user_id,
      p.id AS playlistId,
      p.name AS title,
      count(s.id) AS songTotalCount,
      b.album_image,
      DATE_FORMAT(p.created_at, '%Y.%m.%d') AS created_at
    FROM playlists p
    JOIN playlists_songs s ON s.playlist_id = p.id
    JOIN (
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
    user_id,
    name AS title
    FROM playlists 
    WHERE user_id = ?
    ORDER BY created_at DESC 
    LIMIT 1`,
    [userId],
  );
  return playlist;
};

//플리 곡 추가
const createPlaylistSongs = async (playlistId, songId) => {
  const playlist = await myDataSource.query(
    `INSERT INTO playlists_songs (playlist_id, song_id)
      VALUES (?, ?)`,
    [playlistId, songId],
  );
  return playlist;
};

//타이틀 수정
const editPlaylistTitle = async (newTitle, playlistId) => {
  const playlist = await myDataSource.query(
    `UPDATE playlists
    SET name = ?
    WHERE id = ?`,
    [newTitle, playlistId],
  );
  /* const playlist = await myDataSource.query(
    `SELECT *
    FROM playlists
    WHERE id = ?`,
    [playlistId],
  ); */
  return playlist;
};

//플리 곡 삭제
const deletePlaylist = async (playlistOrSong) => {
  return await myDataSource.query(`${playlistOrSong}`);
};

const getLikedSongsByUserId = async (userId) => {
  const result = await myDataSource.query(
    `SELECT 
    sd.id AS songId,
    sd.songTitle AS songTitle,
    sd.songArtist AS songArtist,
    sd.albumTitle AS albumTitle,
    sd.albumCover AS albumCover
    FROM like_songs AS ls
    LEFT JOIN songdetail AS sd ON sd.id = ls.song_id
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
    sd.albumTitle AS albumTitle,
    sd.albumCover AS albumCover
    FROM play_counts AS pc
    LEFT JOIN songdetail AS sd ON sd.id = pc.song_id
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
    sd.albumTitle AS albumTitle,
    sd.albumCover AS albumCover
    FROM play_counts AS pc
    LEFT JOIN songdetail AS sd ON sd.id = pc.song_id
    WHERE pc.user_id = ?
    ORDER BY pc.updated_at DESC`,
    [userId],
  );
  return result;
};

module.exports = {
  getUserPlaylist,
  createPlaylist,
  createPlaylistSongs,
  editPlaylistTitle,
  deletePlaylist,
  getLikedSongsByUserId,
  getMostListenByUserId,
  getRecentListenByUserId,
};
