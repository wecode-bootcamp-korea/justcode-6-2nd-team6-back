const { myDataSource } = require("./typeorm-client");

const isLiked = async (userId, songId) => {
  console.log(userId, songId);
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
  isLiked,
  isSongIdVaild,
  getSongDataById,
};
