import React, { useState, useContext } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../axios/Auth";
import { GlobelDate } from "../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const {
    setUserName,
    setUserEmail,
    setUserPassword,
    setUserHashPassword,
    setUserInfo,
    setUserID,
    userName,
    userEmail,
    userPassword,
    userHashPassword,
  } = useContext(GlobelDate);
  const [password2, setPassword2] = useState("");

  // const handleUserPassword = (e) => {
  //   setUserPassword(e.target.value);
  // };

  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleRegister = () => {
    Auth.signup(userName, userEmail, userPassword)
      .then((result) => {
        console.log(result);
        if (result["data"]["message"] !== "Email has already registered") {
          toast.success('註冊成功', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          Auth.login(userEmail, userPassword)
            .then((result) => {
              console.log(result["data"][0]["result"]);
              //登入後localStorage存userInfo
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
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
        //   window.alert(result["data"]["message"]);
          toast.warning('信箱已被註冊', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/login");
        }
        navigate("/");
      })
      .catch((err) => {
        toast.error('註冊失敗！', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      });
  };

  const Strength = (password) => {
    let i = 0;
    if (password.length > 6) {
      i++;
    }
    if (password.length >= 10) {
      i++;
    }
    if (/[A-Z]/.test(password)) {
      i++;
    }
    if (/[0-9]/.test(password)) {
      i++;
    }
    if (/[a-z]/.test(password)) {
      i++;
    }
    if (/[A-Za-z0-8]/.test(password) && password.length >= 10) {
      i++;
    }
    return i;
  };
  const [strength, setStrength] = useState(0);
  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
    const newPassword = e.target.value;
    setStrength(Strength(newPassword));
  };
  let strengthClass = '';
  if (strength <= 3 && strength > 0) {
    strengthClass = 'weak';
  } else if (strength > 3 && strength <= 5) {
    strengthClass = 'moderate';
  } else if (strength > 5){
    strengthClass = 'strong';
  }

  return (
    <div className=" myBody d-flex">
      <div className="imgDiv1"></div>
      <div className="registerDiv d-flex">
        <div className={`contaner ${strengthClass} formSize`}>
          <h2 className="mb-3 textAlignC">會員註冊</h2>
          <div className="form-floating">
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              placeholder="請輸入使用者名稱"
              className="form-control"
            />
            <label htmlFor="floatingInput">請輸入使用者名稱</label>
          </div>
          <div className="form-floating">
            <input
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              type="email"
              placeholder="帳號為電子郵件"
              className="form-control inputRadiusNull"
            />
            <label htmlFor="floatingInput">帳號為電子郵件</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              placeholder="請輸入密碼"
              className="form-control inputRadiusNull"
              onChange={handleUserPassword}
              id="YourPassword"
            />
            <label htmlFor="floatingInput">請輸入密碼</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              placeholder="重新輸入密碼"
              className="form-control inputRadiusBottom"
              onChange={handlePassword2}
            />
            <label htmlFor="floatingInput">重新輸入密碼</label>
          </div>
          <div className="strengthMeter"></div>
          {userPassword !== password2 && (
            <div className="passwordCheck">密碼輸入不一致！</div>
            )}
          <div className="form-floating">
            <button
              className="btn submitButton"
              type="submit"
              disabled={userPassword !== password2}
              onClick={handleRegister}
            >
              註冊會員
            </button>
          </div>
          <hr />
          <span className="d-block textAlignC">
            您有帳號了?
            <Link to="/login" className="linkCss">
              立即登入
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer limit={1}/>
    </div>
  );
}

export default Register;
