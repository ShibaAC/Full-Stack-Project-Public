import React, { useContext, useEffect, useState } from "react";
import "./Forgetpwd.css";
import { Link, Navigate, json, useNavigate } from "react-router-dom";
import Auth from "../axios/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Forgetpwd() {
  const navigate = useNavigate();
  let emailCheck = "";
  let verCodeCheck = "";
  let newPassword = "";
  const [forgetPWD, setForgetPWD] = useState(1);
  const [changeEmail, setChangeEmail] = useState("");
  const [verCode, setVerCode] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const handleEmail = () => {
    Auth.forgetPwd(changeEmail)
      .then((result) => {
        console.log(result);
        emailCheck = result["data"];
        if (emailCheck === 1) {
          setForgetPWD(2);
        } else {
            toast.warning("查無此帳號", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        //   alert("查無此帳號");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleVerCode = () => {
    Auth.verCodeCheck(verCode)
      .then((result) => {
        verCodeCheck = result["data"];
        if (verCodeCheck === 1) {
          setForgetPWD(3);
        } else {
            toast.warning("驗證碼錯誤", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        //   alert("驗證碼錯誤");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [strength, setStrength] = useState(0);
  const handlepassword = (e) => {
    setpassword(e.target.value);
    const newPassword = e.target.value;
    setStrength(Strength(newPassword));
  };

  const handlepassword2 = (e) => {
    setpassword2(e.target.value);
  };

  const handleNewPassword = () => {
    Auth.newPassword(password, verCode)
      .then((result) => {
        newPassword = result["data"];
        toast.info(newPassword, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        // alert(newPassword);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
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

  let strengthClass = "";
  if (strength <= 3 && strength > 0) {
    strengthClass = "weak";
  } else if (strength > 3 && strength <= 5) {
    strengthClass = "moderate";
  } else if (strength > 5) {
    strengthClass = "strong";
  }

  return (
    <div className=" forgetBody">
        <ToastContainer limit={1}/>
      <div className="forgetpwdDiv">
        {forgetPWD === 1 && (
          <div action="" className="formSize">
            <h2 className="mb-3 textAlignC">忘記密碼</h2>
            <p></p>
            <div className="form-floating">
              <input
                type="email"
                placeholder="請輸入帳號"
                className="form-control"
                onChange={(e) => setChangeEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">請輸入帳號</label>
            </div>
            <p></p>
            <div className="form-floating">
              <button
                className="btn submitButton"
                type="submit"
                onClick={handleEmail}
              >
                &nbsp;&nbsp;下一步&nbsp;&nbsp;
              </button>
            </div>
          </div>
        )}

        {forgetPWD === 2 && (
          <div className="formSize">
            <h2 className="mb-3 textAlignC">忘記密碼</h2>
            <p>已發送驗證信至您的信箱</p>
            <p></p>
            <div className="form-floating">
              <input
                type="number"
                placeholder="請輸入驗證碼"
                className="form-control"
                onChange={(e) => setVerCode(e.target.value)}
              />
              <label htmlFor="floatingInput">請輸入6位數驗證碼</label>
            </div>
            <p></p>
            <div className="form-floating">
              <button
                className="btn submitButton"
                type="submit"
                onClick={handleVerCode}
              >
                &nbsp;&nbsp;下一步&nbsp;&nbsp;
              </button>
            </div>
          </div>
        )}

        {forgetPWD === 3 && (
          <div className={`contaner ${strengthClass} formSize`}>
            <h2 className="mb-3 textAlignC">忘記密碼</h2>
            <p>請輸入新密碼</p>
            <p></p>
            <div className="form-floating">
              <input
                type="password"
                placeholder="請輸入密碼"
                className="form-control inputRadiusTop"
                onChange={handlepassword}
                id="YourPassword"
              />
              <label htmlFor="floatingInput">請輸入密碼</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                placeholder="重新輸入密碼"
                className="form-control inputRadiusBottom"
                onChange={handlepassword2}
              />
              <label htmlFor="floatingInput">重新輸入密碼</label>
            </div>
            <div className="strengthMeter"></div>
            {password !== password2 && (
              <div className="passwordCheck">密碼輸入不一致！</div>
            )}
            <p></p>
            <div className="form-floating">
              <button
                className="btn submitButton"
                type="submit"
                disabled={password !== password2}
                onClick={handleNewPassword}
              >
                &nbsp;&nbsp;下一步&nbsp;&nbsp;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forgetpwd;
