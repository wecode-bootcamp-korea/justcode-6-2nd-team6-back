const express = require("express");
const browseController = require("../controllers/browse");

const router = express.Router();

router.get("/", browseController.getBrowseData);

module.exports = router;
