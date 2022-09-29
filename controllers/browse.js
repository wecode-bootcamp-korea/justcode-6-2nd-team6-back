const browseService = require("../services/browse");

const getBrowseData = async (req, res) => {
  const { genreid } = req.query;
  try {
    if (!genreid || genreid == 0) {
      const result = await browseService.getFullChart(genreid);
      res.status(200).json(result);
    } else {
      const result = await browseService.getChartByGenre(genreid);
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
  }
};

module.exports = {
  getBrowseData,
};
