const express = require("express");
const playController = require("../controllers/play");

const router = express.Router();

router.get("/addsongs/:type/:id", playController.getSongsData); //플레이 리스트/아티스트/장르 (플레이리스트 아이디, 곡 아이디, 곡 아이디) 곡 정보를 받아옴
router.patch("/:id", playController.play); //곡 재생 횟수 업데이트, 좋아요 여부 반환

module.exports = router;
