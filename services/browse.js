const browseDao = require("../models/browse");

const getFullChart = async () => {
  const result = await browseDao.getSongsOrderByPlayCount();
  return result;
};

const getChartByGenre = async (genreId) => {
  await browseDao.isGenreIdVaild(genreId);
  const result = await browseDao.getSongsByGenreOrderByPlayCount(genreId);
  return result;
};

module.exports = {
  getFullChart,
  getChartByGenre,
};
