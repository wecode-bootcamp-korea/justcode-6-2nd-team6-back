const express = require("express");
const detailController = require("../controllers/detail");

const router = express.Router();

router.get("/track/:id", detailController.getTrackDetail);
router.get("/album/:id/:page", detailController.getAlbumDetail);
router.get("/playlist/:id", detailController.getPlaylistDetail);
router.get("/mylist/:id", detailController.getMylistDetail);
router.get("/artist/:id/:page", detailController.getArtistDetail);

router.use((req, res, next) => {
  res.status(404).json("Not Found");
});

module.exports = router;
