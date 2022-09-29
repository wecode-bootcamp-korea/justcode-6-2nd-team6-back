const { myDataSource } = require("./typeorm-client");

const shuffle = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1));

    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }
  return array;
};

const getFiveRandomValue = async () => {
  const exist = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT playlistId FROM playlistSlide WHERE playlistSongsCount >= 8 GROUP BY playlistId`,
        ),
      ),
    ),
  );
  let existArr = [];
  for (i = 0; i < exist.length; i++) {
    existArr.push(exist[i].playlistId);
  }
  const arr = shuffle(existArr);
  return arr;
};

const getPlaylistSilde = async (result) => {
  const playlistArr = await getFiveRandomValue();
  let slideData = [];
  for (let i = 0; i < 5; i++) {
    let tempObj = {};
    tempObj.titleData = await myDataSource.query(
      `SELECT  playlistId, playlistTitle, playlistSongsCount, createdDate FROM playlistSlide WHERE playlistId = ? GROUP BY playlistId`,
      [playlistArr[i]],
    );
    tempObj.songsData = await myDataSource.query(
      `SELECT  songId, albumImage, songTitle, artist FROM playlistSlide WHERE playlistId = ? LIMIT 8`,
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
     ats.scope AS scope,
     a.album_image AS albumCover
     FROM albums AS a
     LEFT JOIN songs AS s ON s.album_id = a.id
     LEFT JOIN artists AS ats ON a.artist_id = ats.id
     GROUP BY a.id
     ORDER BY releaseDate DESC`,
  );
  return result;
};

const isPlaylistExist = async (playlistId) => {
  const result = await myDataSource.query(
    `SELECT EXISTS (SELECT id FROM playlists WHERE id=?) as isExist`,
    [id],
  );
  return result;
};

module.exports = {
  getPlaylistSilde,
  getRecentReleasedAlbums,
};
