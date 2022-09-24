const { myDataSource } = require("./typeorm-client");

const getMyListByUserId = async (userId) => {
  await myDataSource.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
  );
  const result = await myDataSource.query(
    `SELECT 
    p.id AS playlistId,
    p.name AS playlistTitle, 
    psc.playlistSongsCount AS playlistSongsCount,
    DATE_FORMAT(p.created_at, '%Y.%m.%d') AS createdDate, 
    ps.albumImage AS albumCover 
    FROM playlists AS p
    LEFT JOIN playlistSongs AS ps ON ps.playlistId = p.id
    LEFT JOIN playlistSongsCount AS psc ON psc.playlistId = p.id
    WHERE id = ?
    GROUP BY playlistId`,
    [userId],
  );
  return result;
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
  getMyListByUserId,
  getLikedSongsByUserId,
  getMostListenByUserId,
  getRecentListenByUserId,
};
