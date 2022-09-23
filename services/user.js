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
      from: "01038826683",
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
    const token = jwt.sign({ userEmail: selectUser.email }, SECRET_KEY, {
      expiresIn: "1d",
    });
    return token;
  } else {
    const err = new Error("WRONG_PASSWORD");
    err.statusCode = 400;
    throw err;
  }
};

const getUserCharacter = async (userId) => {
  return await userDao.getUserCharacter(userId);
};

module.exports = {
  createUser,
  send,
  userVerification,
  userExisted,
  userLogin,
  getUserCharacter,
};
