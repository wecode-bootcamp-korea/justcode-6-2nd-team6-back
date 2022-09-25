const express = require("express");
const playController = require("../controllers/play");

const router = express.Router();

router.get("/playlist/:id", playController.getPlaylistSongsData); //플레이 리스트 내의 곡 정보를 받아옴
router.get("/like/:id", playController.isLiked); //유저의 곡 좋아요 여부를 반환
router.patch("/song/:id", playController.getPlayData); //로그인 되어있다면 곡 재생 횟수 업데이트, 곡의 재생 정보를 반환

module.exports = router;
