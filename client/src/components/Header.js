import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { GlobelDate } from "../App";
import UserInfo from "./UserInfo";
import Auth from "../axios/Auth";
import headerLogo from "../imgs/header_logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import presetHeadPhoto from "../imgs/head.png";

function Header() {
  const {
    headphoto,
    setHeadPhoto,
    userinfo,
    setUserInfo,
    setInfoData,
    unreadNotifications,
  } = useContext(GlobelDate);
  const handleLogout = () => {
    Auth.logout(userinfo)
      .then((result) => {
        //登出後把storage的userinfo改成result
        localStorage.setItem(
          "userInfo",
          JSON.stringify(result["data"]["message"][0]["result"])
        );
        //把空字串傳入setUserInfo
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        toast.info("用戶登出", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setUserInfo(
        localStorage
          .getItem("userInfo")
          .substring(1, localStorage.getItem("userInfo").length - 1)
      );
      Auth.enterProfile(userinfo)
        .then((result) => {
          setHeadPhoto(
            `data:image/jpeg;base64, ${result["data"]["message"][0]["profilePhoto"]}`
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  // console.log(headphoto);
  return (
    <div className="header">
      <div className="h50 d-flex my-auto align-items-center navbar-expand-lg navbar-light fW">
        <div className="LOGO">
          <Link to="/" className="mx-5 logoIMG">
            <img src={headerLogo} width="200" height="100%" alt="img" />
          </Link>
        </div>
        <button
          className="navbar-toggler hbg ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse show1"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 hbgUl d-flex my-auto align-items-center">
            <li class="nav-item">
              <Link to="/proposal" className="headerBTN1">
                提案
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/allCase" className="headerBTN2">
                接案
              </Link>
            </li>
            <li class="nav-item dFlex">
              {userinfo ? (
                <div className="dropdown ms-auto">
                  <Link
                    to="#"
                    className="d-block link-dark text-decoration-none"
                    id="dropdownUser2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={
                        headphoto.charAt(23) === "R" ||
                        headphoto.charAt(23) === "i" ||
                        headphoto.charAt(23) === "/" ||
                        headphoto.charAt(24) === "R" ||
                        headphoto.charAt(24) === "i" ||
                        headphoto.charAt(24) === "/"
                          ? headphoto
                          : presetHeadPhoto
                      }
                      style={{ objectFit: "cover" }}
                      alt="mdo"
                      width="40"
                      height="40"
                      className="rounded-circle rwdPhoto"
                    />
                  </Link>
                  <ul
                    className="dropdown-menu text-small shadow rwdhead"
                    aria-labelledby="dropdownUser2"
                  >
                    <li>
                      <Link
                        className="dropdown-item rwdWord"
                        to="/personalinfo"
                        onClick={() => setInfoData("1")}
                      >
                        我的帳號
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item rwdWord"
                        to="/personalinfo"
                        onClick={() => setInfoData("3")}
                      >
                        我的案件
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rwdWord" to="/chatRoom">
                        聊天室
                        <span
                          className={
                            unreadNotifications?.length === 0
                              ? null
                              : "chatRoomNotification"
                          }
                        ></span>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item rwdWord"
                        to=""
                        onClick={handleLogout}
                      >
                        登出
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="dFlex">
                  {/* 第一個標籤不能運作的BUG，所要加一個DIV */}
                  <div></div>
                  <div className="loginBC">
                    <Link to="/login" className="loginBCHover">
                      登入
                    </Link>
                  </div>
                  <div className="RegisterBC">
                    <Link to="/register" className="loginBCHover">
                      註冊
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* <ToastContainer limit={1}/> */}
    </div>
  );
}

export default Header;
