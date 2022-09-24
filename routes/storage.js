const express = require("express");
const storageController = require("../controllers/storage");

const router = express.Router();

router.get("/:page", storageController.getStorage);

module.exports = router;
