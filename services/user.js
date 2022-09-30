const userDao = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const request = require("request");
const Cache = require("memory-cache");
const CryptoJS = require("crypto-js");
const { SECRET_KEY } = process.env;

const createUser = async (email, password, name, phone, birth) => {
  const hashedPw = await bcrypt.hash(password, 10);

  const user = await userDao.createUser(email, hashedPw, name, phone, birth);

  return user;
};

const send = async (phone) => {
  const date = Date.now().toString();
  const uri = process.env.SERVICE_ID; //서비스 ID
  const secretKey = process.env.NCP_SECRET_KEY; // Secret Key
  const accessKey = process.env.NCP_KEY; //Access Key
  const callingNumber = process.env.CALLING_NUMBER; //발신번호
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  Cache.del(phone);

  const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  Cache.put(phone, verifyCode.toString());

  const check = request({
    method: method,
    json: true,
    uri: url,
    headers: {
      "Contenc-type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": accessKey,
      "x-ncp-apigw-timestamp": date,
      "x-ncp-apigw-signature-v2": signature,
    },
    body: {
      type: "SMS",
      countryCode: "82",
      from: callingNumber,
      content: `[FLOrida]인증번호 [${verifyCode}]를 입력해 주세요.`,
      messages: [
        {
          to: `${phone}`,
        },
      ],
    },
  });
  return check;
};

const userVerification = async (phone, verifyCode) => {
  const CacheData = Cache.get(phone);

  if (!CacheData) {
    const err = new Error("INPUT_ERROR");
    err.statusCode = 500;
    throw err;
  } else if (CacheData !== verifyCode) {
    const err = new Error("VERIFICATION_CODE_DO_NOT_MATCH");
    err.statusCode = 500;
    throw err;
  }
  return Cache.del(phone);
};

const userExisted = async (phone) => {
  const user = await userDao.userExisted(phone);

  if (user) {
    const err = new Error("USER_PHONENUMBER_EXISTED");
    err.statusCode = 400;
    throw err;
  }

  return user;
};

const userLogin = async (email, password) => {
  const selectUser = await userDao.selectUser(email);

  if (!selectUser) {
    const error = new Error("NOT_A_USER");
    error.statusCode = 404;
    throw error;
  }

  const comparePw = bcrypt.compareSync(password, selectUser.password);

  if (comparePw) {
    const token = jwt.sign({ userId: selectUser.id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    return token;
  } else {
    const err = new Error("WRONG_PASSWORD");
    err.statusCode = 400;
    throw err;
  }
};

const getUser = async (email) => {
  return await userDao.getUser(email);
};

const getUserId = async (token) => {
  let userId;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      let error = new Error("Error: Invaild Access");
      error.code = 403;
      throw error;
    } else {
      userId = decoded.userId;
    }
  });
  return userId;
};

const likeSong = async (token, songId) => {
  const userId = await getUserId(token);
  const result = await userDao.likeSong(userId, songId);
  return result;
};

module.exports = {
  createUser,
  send,
  userVerification,
  userExisted,
  userLogin,
  getUser,
  likeSong,
};
