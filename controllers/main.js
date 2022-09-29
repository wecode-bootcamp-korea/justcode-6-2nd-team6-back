const mainService = require("../services/main");

const getMainData = async (req, res) => {
  try {
    const result = await mainService.getMainData();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json(err.message);
  }
};

module.exports = {
  getMainData,
};
