const express = require("express");
const validateToken = require("../middlewares/user");
const storageController = require("../controllers/storage");

const router = express.Router();

router.get("/:page", storageController.getStorage);
router.get("", validateToken.validateToken, storageController.getUserPlaylist);
router.post("", validateToken.validateToken, storageController.createPlaylist);
router.delete(
  "",
  validateToken.validateToken,
  storageController.deletePlaylist,
);

module.exports = router;
