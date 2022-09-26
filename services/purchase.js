const purchaseDao = require("../models/purchase");

const getVouchers = async () => {
  const vouchers = await purchaseDao.getVouchers();

  vouchers.map((data) => {
    data.payments = JSON.parse(data.payments);
  });

  return vouchers;
};

const getUserVouchers = async (id) => {
  const vouchers = await purchaseDao.getUserVouchers(id);

  if (!vouchers) {
    const err = new Error("NOT_PURCHASE_VOUCHER");
    err.statusCode = 404;
    throw err;
  }

  return vouchers;
};

const purchaseVoucher = async (
  voucherId,
  userId,
  payment,
  payWith,
  paymentType,
) => {
  return await purchaseDao.purchaseVoucher(
    voucherId,
    userId,
    payment,
    payWith,
    paymentType,
  );
};

//access token
/* const get_token= async=> {
	const access_token = await axios({
    	url: "https://api.iamport.kr/users/getToken",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
                imp_key: "REST API KEY",
                imp_secret: "REST API SECRET"
            }
    });
    return access_token
} */

//아임포트에서 결제 정보 받아오기
/* const get_imp= async(imp_uid)=> {
const access_token= await get_token();
const getPaymentData = await axios({
	url:`https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
	method: "get", // GET method
	headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
});
const paymentData = getPaymentData.data.response;
        
} */

module.exports = {
  getVouchers,
  getUserVouchers,
  purchaseVoucher,
};
