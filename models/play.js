const { myDataSource } = require("./typeorm-client");

//바우처 보유 여부
const hasVoucher = async (userId) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT EXISTS (SELECT voucher_id FROM users as u LEFT JOIN purchase AS p ON p.user_id = u.id WHERE user_id = ?) as isExist`,
          [userId],
        ),
      ),
    ),
  )[0].isExist;
  return result;
};

//유저의 플레이리스트 존재 여부 확인
// const isUserPlaylistVaild = async (userId, playlistId) => {
//   const result = await myDataSource.query(
//     `SELECT EXISTS (SELECT * FROM playlists WHERE (user_id = ? AND id = ?)) as isExist`,
//     [userId, playlistId],
//   );
//   const isExist = Object.values(JSON.parse(JSON.stringify(result)))[0].isExist;
//   if (isExist == 1) {
//     return;
//   } else {
//     let error = new Error("Error: No Data");
//     error.code = 200;
//     throw error;
//   }
// };

//곡 존재 여부
const isSongIdVaild = async (id) => {
  const result = await myDataSource.query(
    `SELECT EXISTS (SELECT * FROM songs WHERE id=?) as isExist`,
    [id],
  );
  const isExist = Object.values(JSON.parse(JSON.stringify(result)))[0].isExist;
  if (isExist == 1) {
    return;
  } else {
    let error = new Error("Error: No Song Data");
    error.code = 200;
    throw error;
  }
};

//플레이리스트 아이디로 플레이리스트 정보와 곡 정보 가져오기
const getPlaylistSongsDataById = async (id) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT 
          ps.songId AS songId,
          ps. songTitle AS songTitle,
          ps.artist AS songArtist,
          ps.albumImage AS albumCover,
          s.content AS content
          FROM playlistSongs AS ps 
          LEFT JOIN playlists AS p ON p.id = ps.playlistId 
          LEFT JOIN songs AS s ON s.id = ps.songId
          WHERE p.id = ?`,
          [id],
        ),
      ),
    ),
  );
  if (!result[0] || !result[0].songId) {
    let error = new Error("Error: No Data");
    error.code = 200;
    throw error;
  }
  return result;
};

//아티스트 아이디로 아티스트 곡 정보 가져오기
const getArtistSongsDataBySongId = async (songId) => {
  const artistId = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT artist_id FROM songs AS s LEFT JOIN albums AS a ON s.album_id = a.id WHERE s.id = ?`,
          [songId],
        ),
      ),
    ),
  )[0].artist_id;
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT
    s.id AS songId,
    s.name AS songTitle,
    s.content AS content,
    ats.name AS songArtist,
    a.album_image AS albumCover
    FROM songs AS s
    LEFT JOIN albums AS a ON s.album_id = a.id
    LEFT JOIN artists AS ats ON a.artist_id = ats.id
    WHERE ats.id = ?;`,
          [artistId],
        ),
      ),
    ),
  );
  return result;
};

//장르 아이디로 장르 곡 정보 가져오기
const getGenreSongsDataBySongId = async (songId) => {
  const genreId = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT genre_id FROM songs AS s WHERE s.id = ?`,
          [songId],
        ),
      ),
    ),
  )[0].genre_id;
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT
    s.id AS songId,
    s.name AS songTitle,
    s.content AS content,
    ats.name AS songArtist,
    a.album_image AS albumCover
    FROM songs AS s
    LEFT JOIN albums AS a ON s.album_id = a.id
    LEFT JOIN artists AS ats ON a.artist_id = ats.id
    WHERE s.genre_id = ?;`,
          [genreId],
        ),
      ),
    ),
  );
  return result;
};

const getlikedSongsDataByUserId = async (userId) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT 
          sd.id AS songId,
          sd.songTitle AS songTitle,
          sd.songArtist AS songArtist,
          sd.content AS content,
          sd.albumTitle AS albumTitle,
          sd.albumCover AS albumCover
          FROM like_songs AS ls
          LEFT JOIN songdetail AS sd ON sd.id = ls.song_id
          WHERE ls.user_id = ?`,
          [userId],
        ),
      ),
    ),
  );
  return result;
};

const getMostListenSongsDataByUserId = async (userId) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT 
          sd.id AS songId,
          sd.songTitle AS songTitle,
          sd.songArtist AS songArtist,
          sd.content AS content,
          sd.albumTitle AS albumTitle,
          sd.albumCover AS albumCover
          FROM play_counts AS pc
          LEFT JOIN songdetail AS sd ON sd.id = pc.song_id
          WHERE pc.user_id = ?
          ORDER BY pc.play_count DESC`,
          [userId],
        ),
      ),
    ),
  );
  return result;
};

const getRecentListenSongsDataByUserId = async (userId) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT 
          sd.id AS songId,
          sd.songTitle AS songTitle,
          sd.songArtist AS songArtist,
          sd.content AS content,
          sd.albumTitle AS albumTitle,
          sd.albumCover AS albumCover
          FROM play_counts AS pc
          LEFT JOIN songdetail AS sd ON sd.id = pc.song_id
          WHERE pc.user_id = ?
          ORDER BY pc.updated_at DESC`,
          [userId],
        ),
      ),
    ),
  );
  return result;
};

const getPopularSongsData = async () => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT id AS songId, songTitle, songArtist, albumTitle, albumCover, content
          FROM songDetail AS sd 
          LEFT JOIN songPlayCountSum AS spcs ON sd.id = spcs.song_id 
          ORDER BY spcs.total_count DESC`,
        ),
      ),
    ),
  );
  return result;
};

const getAlbumSongsDataByAlbumId = async (albumId) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT songId, songTitle, artist AS songArtist, albumTitle, albumCover, content
         FROM albumTracklist WHERE albumId = ?`,
          [albumId],
        ),
      ),
    ),
  );
  return result;
};

//재생목록에 한 곡 추가
const getSongDataBySongId = async (songId) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT
    s.id AS songId,
    s.name AS songTitle,
    s.content AS content,
    ats.name AS songArtist,
    a.album_image AS albumCover
    FROM songs AS s
    LEFT JOIN albums AS a ON s.album_id = a.id
    LEFT JOIN artists AS ats ON a.artist_id = ats.id
    WHERE s.id = ?;`,
          [songId],
        ),
      ),
    ),
  );
  return result;
};

//재생시 카운트 추가
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

//좋아요 여부
const isLiked = async (userId, songId) => {
  const result = Object.values(
    JSON.parse(
      JSON.stringify(
        await myDataSource.query(
          `SELECT EXISTS (SELECT * FROM like_songs WHERE user_id=? AND song_id = ?) as isLiked`,
          [userId, songId],
        ),
      ),
    ),
  )[0];
  return result;
};

module.exports = {
  hasVoucher,
  getPlaylistSongsDataById,
  getArtistSongsDataBySongId,
  getGenreSongsDataBySongId,
  getSongDataBySongId,
  isSongIdVaild,
  updatePlayCount,
  isLiked,
  getlikedSongsDataByUserId,
  getMostListenSongsDataByUserId,
  getRecentListenSongsDataByUserId,
  getPopularSongsData,
  getAlbumSongsDataByAlbumId,
};
