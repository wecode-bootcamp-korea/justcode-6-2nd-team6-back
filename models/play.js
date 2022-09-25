const { myDataSource } = require("./typeorm-client");

const isUserPlaylistVaild = async (userId, playlistId) => {
  const result = await myDataSource.query(
    `SELECT EXISTS (SELECT * FROM playlists WHERE (user_id = ? AND id = ?)) as isExist`,
    [userId, playlistId],
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

const getPlaylistSongsDataById = async (id) => {
  let result = {};
  result.playlistInfo = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT ps.playlistId, p.name AS playlistTitle 
          FROM playlistSongs AS ps 
          LEFT JOIN playlists AS p ON p.id = ps.playlistId WHERE ps.playlistId = ?
          GROUP BY ps.playlistId`,
          [id],
        ),
      ),
    ),
  );
  result.playlistSongsInfo = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT p.Id AS playlistId, ps.songId, ps.albumId, ps.albumImage, ps.artist FROM playlistSongs AS ps LEFT JOIN playlists AS p ON p.id = ps.playlistId WHERE p.id = ?`,
          [id],
        ),
      ),
    ),
  );
  return result;
};

const isLiked = async (userId, songId) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT EXISTS (SELECT * FROM like_songs WHERE user_id=? AND song_id = ?) as isExist`,
          [userId, songId],
        ),
      ),
    ),
  )[0];
  return result;
};

const isSongIdVaild = async (id) => {
  const result = await myDataSource.query(
    `SELECT EXISTS (SELECT * FROM songs WHERE id=?) as isExist`,
    [id],
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

const updatePlayCount = async (userId, songId) => {
  const isExist = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT EXISTS (SELECT * FROM play_counts WHERE (user_id = ? AND song_id = ?)) as isExist`,
          [userId, songId],
        ),
      ),
    ),
  )[0].isExist;
  if (isExist == 1) {
    await myDataSource.query(
      `UPDATE play_counts SET play_count =  play_count +1, updated_at = now() WHERE (user_id = ? AND song_id = ?)`,
      [userId, songId],
    );
    return;
  } else if (isExist == 0) {
    await myDataSource.query(
      `INSERT play_counts (user_id, song_id, play_count, updated_at) VALUES (?, ?, 1, now())`,
      [userId, songId],
    );
    return;
  }
  await myDataSource.query(``);
};

const getSongDataById = async (id) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT sd.id, sd.songTitle, sd.songArtist, s.content, sd.albumCover FROM songDetail AS sd LEFT JOIN songs AS s ON s.id = sd.id WHERE sd.id = ?`,
          [id],
        ),
      ),
    ),
  )[0];
  return result;
};

module.exports = {
  isUserPlaylistVaild,
  getPlaylistSongsDataById,
  isLiked,
  isSongIdVaild,
  updatePlayCount,
  getSongDataById,
};
