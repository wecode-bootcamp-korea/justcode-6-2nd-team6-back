const express = require("express");
const router = express.Router();

const browseRouter = require("./browse");
const detailRouter = require("./detail");
const purchaseRouter = require("./purchase");
const storageRouter = require("./storage");
const usersRouter = require("./user");

router.use("/users", usersRouter);
router.use("/browse", browseRouter);
router.use("/storage", storageRouter);
router.use("/purchase", purchaseRouter);
router.use("/detail", detailRouter);

module.exports = router;
