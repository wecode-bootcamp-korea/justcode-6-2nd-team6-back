const express = require("express");
const router = express.Router();

const memberRouter = require("../routes/member");
const browseRouter = require("../routes/browse");
const storageRouter = require("../routes/storage");
const purchaseRouter = require("../routes/purchase");
const detailRouter = require("../routes/detail");

router.use("/member", memberRouter);
router.use("/browse", browseRouter);
router.use("/storage", storageRouter);
router.use("/purchase", purchaseRouter);
router.use("/detail", detailRouter);

module.exports = router;
