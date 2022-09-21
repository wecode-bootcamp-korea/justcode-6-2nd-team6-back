const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// 회원가입
router.post("/signup", userController.createUser);

// 인증번호 발송
router.post("/send", userController.send);

// 인증번호 검증
router.post("/verify", userController.userVerification);

// 휴대폰 번호 중복 체크
router.get("/signup", userController.userExisted);

// 로그인
router.post("/login", userController.userLogin);

module.exports = router;
