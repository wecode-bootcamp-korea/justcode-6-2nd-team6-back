const express = require("express");
const mainController = require("../controllers/main");

const router = express.Router();

router.get("/", mainController.getMainData);

router.use((req, res, next) => {
  res.status(404).json("Not Found");
});

module.exports = router;
