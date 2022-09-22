const userDao = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;

    if (!access_token) {
      res.status(400).json({ error: "TOKEN_NOT_VERIFIED" });
      return;
    }

    const userId = jwt.verify(access_token, SECRET_KEY);

    const foundUser = await userDao.selectUser(userId.userEmail);

    if (!foundUser) {
      res.status(404).json({ message: "USER_NOT_FOUND" });
      return;
    }
    req.foundUser = foundUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "TOKEN_EXPIRED" });
  }
};

module.exports = { validateToken };
