const { myDataSource } = require("./typeorm-client");

//유저 플리 조회
const getUserPlaylist = async (userId) => {
  const userPlaylist = await myDataSource.query(
    `SELECT 
      p.user_id,
      p.name AS title,
      count(s.id) AS songTotalCount,
      DATE_FORMAT(p.created_at, '%Y.%m.%d') AS created_at
    FROM playlists p
    JOIN playlists_songs s ON s.playlist_id = p.id
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

module.exports = {
  getUserPlaylist,
  createPlaylist,
  createPlaylistSongs,
  editPlaylistTitle,
  deletePlaylist,
};
