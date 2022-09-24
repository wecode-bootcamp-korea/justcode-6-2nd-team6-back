const express = require("express");
const playController = require("../controllers/play");

const router = express.Router();

router.get("/like/:id", playController.isLiked);
router.get("/:id", playController.getPlayData);

module.exports = router;
