const { selectUser } = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const access_token = req.headers["authorization"];

    if (!access_token) {
      res.status(400).json({ error: "TOKEN_NOT_VERIFIED" });
      return;
    }

    const userId = jwt.verify(access_token, SECRET_KEY);
    const findUser = await selectUser(userId.userEmail);

    if (!findUser) {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }
    req.findUser = findUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "TOKEN_EXPIRED" });
  }
};

/* (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }
  try {
    const { email } = jwt.verify(authToken, SECRET_KEY);
    await userDao.selectUser(email).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
}; */

module.exports = { validateToken };
