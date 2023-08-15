import axios from "axios"; // 引入 axios 工具

// 後端給的網址
const API_URL =
  "http://localhost/Full-Stack-Project/server/public/index.php/api";
// "https://4f5a-2001-b011-9807-59a3-714d-fb29-35af-f071.ngrok-free.app/public/index.php/api";

class Auth {
  // class 內的 function 可以省略前綴
  signup(userName, email, password) {
    // 取得從後端回傳的資料
    // 現在要註冊所以要用 【post】
    // axios.method('網址',{ 傳給後端的參數 })
    return axios.post(API_URL + "/auth/signup", {
      userName,
      email,
      password,
    });
  }

  // 處理登入
  login(email, password) {
    return axios.post(API_URL + "/auth/login", {
      email,
      password,
    });
  }

  // 處理登出
  logout(token) {
    return axios.post(API_URL + "/auth/logout", {
      token,
    });
  }

  //進入前比對token
  checkToken(token, userID) {
    return axios.post(API_URL + "/checktoken", {
      token,
      userID,
    });
  }

  userInfo(email) {
    // 現在要取得資料所以要用 【get】
    // 利用網址參數傳遞給後端
    return axios.get(API_URL + `/auth/login/${email}`);
  }

  //帳戶資料
  //進入我的帳戶
  enterProfile(token) {
    return axios.get(API_URL + `/enterprofile/${token}`);
  }

  //頭像修改
  uploadPhoto(headphoto, userId) {
    return axios.post(
      API_URL + "/upload-photo",
      {
        photo: headphoto,
        userID: userId,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  //姓名修改
  updateUser(myUserID, myUserName) {
    return axios.post(API_URL + `/update-user/${myUserID}/${myUserName}`);
  }

  //修改密碼
  checkOldPassword(myUserID, myNewPassword, myOldPassword) {
    return axios.post(API_URL + "/checkoldpassword", {
      myUserID,
      myNewPassword,
      myOldPassword,
    });
  }

  //修改電話
  updatePhone(myUserID, myPhone) {
    return axios.post(API_URL + "/update-phone", {
      myUserID,
      myPhone,
    });
  }

  //修改學經歷
  updateExperience(myUserID, myExperience) {
    return axios.post(API_URL + "/update-education", {
      myUserID,
      myExperience,
    });
  }

  //修改作品集
  updatePortfolio(myUserID, myPortfolio) {
    return axios.post(
      API_URL + "/update-portfolio",
      {
        myUserID,
        myPortfolio,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  //修改擅長工具
  updateSkills(myUserID, mySkills) {
    return axios.post(API_URL + "/update-skills", {
      myUserID,
      mySkills,
    });
  }

  //修改自傳
  updateSelfIntroduction(myUserID, mySelfIntroduction) {
    return axios.post(API_URL + "/update-SelfIntroduction", {
      myUserID,
      mySelfIntroduction,
    });
  }

  // 提案紀錄
  getProposeCase(userID, caseStatus, page) {
    console.log(userID, caseStatus, page);
    return axios.get(API_URL + "/getProposeCase", {
      params: {
        userID,
        caseStatus,
        page,
      },
    });
  }
  // 接案紀錄
  getBidderCase(userID, caseStatus, page) {
    console.log(userID, caseStatus);
    return axios.get(API_URL + "/getBidderCase", {
      params: {
        userID,
        caseStatus,
        page,
      },
    });
  }

  // 刪除案件
  deleteCase(caseID) {
    return axios.get(API_URL + "/deleteCase", {
      params: {
        caseID,
      },
    });
  }

  // 下架案件
  cancelCase(caseID) {
    return axios.get(API_URL + "/cancelCase", {
      params: {
        caseID,
      },
    });
  }

  // 修改案件
  caseRevise(caseID) {
    return axios.get(API_URL + "/caseRevise", {
      params: {
        caseID,
      },
    });
  }

  //提案進度條
  enterCaseStepClient(userID, page) {
    return axios.get(API_URL + "/enterCaseStepClient", {
      params: {
        userID,
        page,
      },
    });
  }

  enterCaseStepBidder(userID, page) {
    return axios.get(API_URL + "/enterCaseStepBidder", {
      params: {
        userID,
        page,
      },
    });
  }

  //提案者or接案者按下完成
  stepConfirm(userID, caseID, deadLine) {
    return axios.post(API_URL + "/stepConfirm", {
      userID,
      caseID,
      deadLine,
    });
  }

  // 案主查看資訊
  checkProfile(userID) {
    return axios.get(API_URL + "/checkProfile", {
      params: {
        userID,
      },
    });
  }
  
  //忘記密碼傳送Email
  forgetPwd(changeEmail) {
    return axios.get(API_URL + "/Forgetpwd", {
      params: {
        changeEmail,
      },
    });
  }

  //忘記密碼傳送驗證碼
  verCodeCheck(verCode) {
    return axios.get(API_URL + "/verCodeCheck", {
      params: {
        verCode,
      },
    });
  }

  //忘記密碼 密碼重設
  newPassword(password, verCode) {
    return axios.get(API_URL + "/newPassword", {
      params: {
        password,
        verCode,
      },
    }); 
  }

  //google登入
  googleLogin(userName, email, photoURL) {
    return axios.post(API_URL + "/googleLogin", {
      userName, 
      email, 
      photoURL,
    });
  }

  // 進到我的收藏
  enterFavorite(userID, page) {
    return axios.post(API_URL + '/enterFavorite', {
      userID,
      page,
    });
  }

  // icon狀態   + '/collectionState' 
  collectionState(userID,caseID) {
    // const data ={
    //    userID,
    //    caseID
    // }
    // return axios.post('http://localhost/Full-Stack-Project/server/public/api/collectionState ',data 
    // {
    // myuserID,
    //   mycaseID,
    // }
    return axios.post(API_URL + '/collectionState', {
      userID,
      caseID,
    });
  }





}

// new 一個 Auth 的實例 ，export default 默認導出 供其他程式直接引用
export default new Auth();
