const { myDataSource } = require("./typeorm-client");

const getFiveRandomValue = (max) => {
  let arr = [];
  const isDup = (n) => {
    return arr.find((e) => e === n);
  };
  for (let i = 0; i < 5; i++) {
    let n = Math.floor(Math.random() * max) + 1;
    if (!isDup(n)) {
      arr.push(n);
    } else {
      i--;
    }
  }
  return arr;
};

const getPlaylistSilde = async (result) => {
  const playlistMax = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT MAX(playlistId) AS max FROM playlistSlide`,
        ),
      ),
    ),
  )[0].max;
  const playlistArr = getFiveRandomValue(playlistMax);
  let slideData = [];
  for (let i = 0; i < playlistArr.length; i++) {
    let tempObj = {};
    tempObj.titleData = await myDataSource.query(
      `SELECT  playlistId, playlistTitle, playlistSongsCount, createdDate FROM playlistSlide WHERE playlistId = ? GROUP BY playlistId`,
      [playlistArr[i]],
    );
    tempObj.songsData = await myDataSource.query(
      `SELECT  albumImage, songTitle, artist FROM playlistSlide WHERE playlistId = ? LIMIT 8`,
      [playlistArr[i]],
    );
    slideData.push(tempObj);
  }
  result.slideData = slideData;
  return result;
};

const getRecentReleasedAlbums = async (result) => {
  result.recent = await myDataSource.query(
    `SELECT
     a.id AS albumId,
     a.name AS albumTitle,
     a.release_date AS releaseDate,
     ats.id AS artistId,
     ats.name AS artist,
     ats.scope AS scope 
     FROM albums AS a
     LEFT JOIN songs AS s ON s.album_id = a.id
     LEFT JOIN artists AS ats ON a.artist_id = ats.id
     GROUP BY a.id
     ORDER BY releaseDate DESC`,
  );
  return result;
};

module.exports = {
  getPlaylistSilde,
  getRecentReleasedAlbums,
};
