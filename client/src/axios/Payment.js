import axios from "axios";

// 後端給的網址
const API_URL =
  "https://29ba-118-163-218-100.ngrok-free.app/index.php/api/payment";

class Payment {
  // 發送訂單資訊
  pay(MerchantTradeNo, ItemName, TotalAmount, TradeDesc, caseID) {
    console.log(MerchantTradeNo, ItemName, TotalAmount, TradeDesc, caseID);
    console.log("client ECPay");
    return axios.post(API_URL + "/pay", {
      MerchantTradeNo,
      ItemName,
      TotalAmount,
      TradeDesc,
      caseID,
    });
  }

  //* 合作的綠界
  collaboration(MerchantTradeNo, ItemName, TotalAmount, TradeDesc, bidderID) {
    console.log(MerchantTradeNo, ItemName, TotalAmount, TradeDesc, bidderID);
    console.log("client ECPay");
    return axios.post(API_URL + "/collaboration", {
      MerchantTradeNo,
      ItemName,
      TotalAmount,
      TradeDesc,
      bidderID,
    });
  }

  // 取得回傳資料
  callback() {
    return axios.post(API_URL + "/callback");
  }
}

export default new Payment();
