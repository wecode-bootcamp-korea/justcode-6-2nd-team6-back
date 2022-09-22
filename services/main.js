const mainDao = require("../models/main");

const getMainData = async () => {
  let mainDataContainer = {};
  const mainDataWithSlide = await mainDao.getPlaylistSilde(mainDataContainer);
  const result = await mainDao.getRecentReleasedAlbums(mainDataWithSlide);
  return result;
};

module.exports = {
  getMainData,
};
