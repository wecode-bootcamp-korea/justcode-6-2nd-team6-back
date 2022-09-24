const e = require("express");
const storageService = require("../services/storage");

const getStorage = async (req, res) => {
  const page = req.params.page;
  if (!req.headers.authorization) {
    noToken();
  } else {
    try {
      const token = req.headers.authorization.substring(7);
      const userId = await storageService.getuserId(token);
      switch (page) {
        case "mylist":
          result = await storageService.getMyList(userId);
          break;
        case "liketrack":
          result = await storageService.getMostListen(userId);
          break;
        case "mostlisten":
          result = await storageService.getMostListen(userId);
          break;
        case "recentlisten":
          result = await storageService.getRecentListen(userId);
          break;
        default:
          res.status(404).json("Not Found");
          break;
      }
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json(err.message);
    }
  }
};

const noToken = async () => {
  res.status(200).json({ message: "please_login" });
};

module.exports = {
  getStorage,
};
