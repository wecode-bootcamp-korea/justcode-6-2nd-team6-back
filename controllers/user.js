const userService = require("../services/user");

const createUser = async (req, res) => {
  const { email, password, name, phone, birth } = req.body;

  if (!(email && password && name && phone && birth)) {
    res.status(400).json({ err: "INPUT_ERROR" });
    return;
  }

  try {
    await userService.createUser(email, password, name, phone, birth);
    res.status(201).json({ message: "USER_CREATED" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const send = async (req, res) => {
  const { phone } = req.body;

  try {
    await userService.send(phone);
    res.status(200).json({ message: "SEND_MESSAGE_SUCCESS" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const userVerification = async (req, res) => {
  const { phone, verifyCode } = req.body;

  try {
    await userService.userVerification(phone, verifyCode);
    res.status(200).json({ message: "VERIFICATION_SUCCESS" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const userExisted = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    res.status(400).json({ error: "INPUT_ERROR" });
    return;
  }

  try {
    await userService.userExisted(phone);
    res.status(200).json({ message: "USER_NOT_FOUND" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "INPUT_ERROR" });
  }

  try {
    const token = await userService.userLogin(email, password);
    const selectUser = await userService.getUser(email);
    res
      .status(200)
      .json({ message: "LOGIN_SUCCESS", data: selectUser, token: token });
  } catch (err) {
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const likeSong = async (req, res) => {
  if (!req.headers["authorization"]) {
    res.status(200).json({ message: "please_login" });
  } else {
    const token = req.headers["authorization"];
    const songId = req.params.id;
    try {
      const result = await userService.likeSong(token, songId);
      if (result == 1) {
        res.status(201).json({ message: "좋아요가 취소되었습니다.", result });
      } else {
        res
          .status(201)
          .json({ message: "좋아요한 곡에 추가되었습니다.", result });
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({ err: err.message });
    }
  }
};

module.exports = {
  createUser,
  send,
  userVerification,
  userExisted,
  userLogin,
  likeSong,
};
