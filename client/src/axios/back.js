import axios from "axios"; // 引入 axios 工具

// 後端給的網址
const API_URL =
  "http://localhost/Full-Stack-Project/server/public/index.php/api";

class back {
  alluser(page) {
    // 取得從後端回傳的資料
    // 現在要註冊所以要用 【post】
    // axios.method('網址',{ 傳給後端的參數 })
    return axios.get(API_URL + "/backstage/alluser", {
      params: {
        page,
      },
    });
  }

  allcase(page) {
    return axios.get(API_URL + "/backstage/allcase", {
      params: {
        page,
      },
    });
  }
  delcase(caseID) {
    return axios.post(API_URL + "/backstage/delcase", {
      caseID,
    });
  }
  getcasepage() {
    return axios.get(API_URL + "/backstage/CasePage", {});
  }
}
export default new back();
