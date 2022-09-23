const { myDataSource } = require("./typeorm-client");

const isGenreIdVaild = async (genreId) => {
  const result = await myDataSource.query(
    `SELECT EXISTS (SELECT * FROM genres WHERE id=?) as isExist`,
    [genreId],
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

const getSongsOrderByPlayCount = async () => {
  const result = await myDataSource.query(
    `SELECT id AS songId, songTitle, songArtist, albumTitle, albumCover 
    FROM songDetail AS sd 
    LEFT JOIN songPlayCountSum AS spcs ON sd.id = spcs.song_id 
    ORDER BY spcs.total_count DESC`,
  );
  return result;
};

const getSongsByGenreOrderByPlayCount = async (genreId) => {
  const result = await myDataSource.query(
    `SELECT sd.id AS songId, songTitle, songArtist, albumTitle, albumCover, g.name AS songGenre
    FROM songDetail AS sd 
    LEFT JOIN songPlayCountSum AS spcs ON sd.id = spcs.song_id 
    LEFT JOIN songs AS s ON sd.id = s.id
    LEFT JOIN genres AS g ON s.genre_id = g.id
    WHERE g.id = ?
    ORDER BY spcs.total_count DESC`,
    [genreId],
  );
  return result;
};

module.exports = {
  isGenreIdVaild,
  getSongsOrderByPlayCount,
  getSongsByGenreOrderByPlayCount,
};
