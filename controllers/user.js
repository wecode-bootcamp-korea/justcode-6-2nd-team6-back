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
    res.status(200).json({ message: "LOGIN_SUCCESS", token: token });
  } catch (err) {
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

const getUserCharacter = async (req, res) => {
  const { id } = req.findUser;

  if (!id) {
    res.status(401).json({ message: "NEED_LOGIN" });
    return;
  }

  try {
    const user = await userService.getUserCharacter(id);
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ err: err.message });
  }
};

module.exports = {
  createUser,
  send,
  userVerification,
  userExisted,
  userLogin,
  getUserCharacter,
};
