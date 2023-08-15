import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { Link, json, useNavigate } from "react-router-dom";
import { GlobelDate } from "../App";
import Auth from "../axios/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provide, provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Button } from "antd";

function Login() {

  const googleLogin = async () =>{
    const googleResult = await signInWithPopup(auth, provide);
    const user = googleResult["user"];
    // console.log(user);
    Auth.googleLogin(user["displayName"], user["email"], user["photoURL"])
    .then((result) => {
      console.log(result["data"][0]["token"]);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(result["data"][0]["token"])
      );
      //登入後userinfo這個state要有東西才能判斷header是否登入
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      //登入後存userid
      setUserID(result["data"][0]["userID"]);
      localStorage.setItem(
        "userID",
        JSON.stringify(result["data"][0]["userID"])
      );
      navigate("/");
    });
  }

  const facebookLogin = async () =>{
    const googleResult = await signInWithPopup(auth, provider);
    const user = googleResult["user"];
      console.log(user);
  }



  // 轉址所需
  const navigate = useNavigate();
  // 取得全域變數
  const {
    userinfo,
    setUserInfo,
    setUserEmail,
    setUserPassword,
    setHeadPhoto,
    userEmail,
    userPassword,
    userID,
    setUserID,
  } = useContext(GlobelDate);
  const [rememberID, setRememberID] = useState(false);

  // 將輸入資料傳給後端匹配，並取得使用者資訊
  const handleLogin = () => {
    setUserID(JSON.parse(localStorage.getItem("userID")));

    Auth.login(userEmail, userPassword)
      .then((result) => {
        console.log(result);
        if (result["data"] == "帳號或密碼錯誤") {
            // Alert
            toast.error('帳號或密碼錯誤', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
        }

        //登入後localStorage存userInfo
        localStorage.setItem(
          "userInfo",
          JSON.stringify(result["data"][0]["token"])
        );
        //記住帳號，如果rememberID是true就存使用者輸入的userEmail，沒勾就存空字串
        JSON.parse(localStorage.getItem("rememberID"))
          ? localStorage.setItem("accountNumber", JSON.stringify(userEmail))
          : localStorage.setItem("accountNumber", JSON.stringify(""));
        //登入後userinfo這個state要有東西才能判斷header是否登入
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        //登入後存userid
        setUserID(result["data"][0]["userID"]);
        setHeadPhoto(
          `data:image/jpeg;base64, ${result["data"][0]["profilePhoto"]}`
        );
        localStorage.setItem(
          "userID",
          JSON.stringify(result["data"][0]["userID"])
        );

        console.log(result["data"][0]["token"]);
        if (JSON.parse(localStorage.getItem("userInfo")) === null) {
            toast.error('登入失敗', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (result["data"][0]["result"] === "登入成功") {
            toast.success('登入成功', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
          // 導向至首頁, 如果是管理員帳號的話導向到後台
          if (result["data"][0]["membershipLevel"] === "root") {
            navigate("/Backstage");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    localStorage.setItem("rememberID", JSON.stringify(false));

    // 預防介面刷新，email 取不到問題
    if (JSON.parse(localStorage.getItem("rememberID")) === true) {
      setUserEmail(JSON.parse(localStorage.getItem("accountNumber")));
    }
  }, []);


  return (
    <div className=" myBody d-flex">
      <div className="loginDiv d-flex">
        <div action="" className="formSize">
          <h2 className="mb-3 textAlignC">會員登入</h2>
          <div className="form-floating">
            <input
              type="email"
              placeholder="帳號為電子郵件"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              defaultValue={JSON.parse(localStorage.getItem("accountNumber"))}
              className="form-control inputRadiusTop"
            />
            <label htmlFor="floatingInput">帳號為電子郵件</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              placeholder="請輸入密碼"
              className="form-control inputRadiusBottom"
            />
            <label htmlFor="floatingInput">請輸入密碼</label>
          </div>
          <div className="my-2 d-flex justify-content-between">
            <label htmlFor="rememberID">
              <input
                type="checkbox"
                id="rememberID"
                onChange={() =>
                  localStorage.setItem(
                    "rememberID",
                    !JSON.parse(localStorage.getItem("rememberID"))
                  )
                }
              />
              記住帳號
            </label>
            <div>
              <Link to="/Forgetpwd" className="linkCssSm">
                忘記密碼
              </Link>
            </div>
          </div>
          <div className="form-floating">
            <button
              className="btn submitButton"
              type="submit"
              onClick={handleLogin}
            >
              &nbsp;&nbsp;登入&nbsp;&nbsp;
            </button>
            <ToastContainer limit={1} />
          </div>
          <hr />
          <span className="d-block textAlignC">
            還沒有帳號嗎?
            <Link to="/register" className="linkCss">
              立即註冊
            </Link>
          </span>
          <div>
            <button
              className="btn googleButton"
              type="submit"
              onClick={googleLogin}
            >
            <svg  width="20" height="20" fill="currentColor" className="googleLogo" viewBox="0 0 16 16">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
            </svg>
              &nbsp;&nbsp;使用 Google 帳戶登入&nbsp;&nbsp;
            </button>
          </div>
          {/* <div>
            <button
              className="btn googleButton"
              type="submit"
              onClick={facebookLogin}
            >
              &nbsp;&nbsp;使用facebook帳號登入&nbsp;&nbsp;
            </button>
          </div> */}
        </div>
      </div>
      <div className="imgDiv"></div>
    </div>
  );
}

export default Login;
