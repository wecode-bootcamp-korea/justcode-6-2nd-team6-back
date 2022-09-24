const express = require("express");
const router = express.Router();

const mainRouter = require("./main");
const browseRouter = require("./browse");
const detailRouter = require("./detail");
const purchaseRouter = require("./purchase");
const storageRouter = require("./storage");
const usersRouter = require("./user");
const playRouter = require("./play");

router.use("/users", usersRouter);
router.use("/browse", browseRouter);
router.use("/storage", storageRouter);
router.use("/purchase", purchaseRouter);
router.use("/detail", detailRouter);
router.use("/play", playRouter);

router.use("/", mainRouter);

module.exports = router;
