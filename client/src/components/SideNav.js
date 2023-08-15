import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./sidenav.css";
import { GlobelDate } from "../App";

function SideNav() {
  const { setInfoData, setProposal, setTakethecase } = useContext(GlobelDate);

  const [sideNav, setSideNav] = useState(true);

  const [showBtn, setShowBtn] = useState(false);

  const handleShowSideNav = () => {
    setSideNav(!sideNav);
  };

  //RWD
  const mediaQuerySmall = window.matchMedia("(max-width: 992px)");

  window.addEventListener("resize", () => {
    if (mediaQuerySmall.matches) {
      // console.log("小");
      setShowBtn(true);
      setSideNav(false);
    } else {
      // console.log("大");
      setShowBtn(false);
      setSideNav(true);
    }
  });

  return (
    <div className="sideNav">
      {showBtn && (
        <button
          className="sideNavBtn"
          type="button"
          onClick={handleShowSideNav}
        >
          {sideNav ? "<" : ">"}
        </button>
      )}
      {sideNav && (
        <div className="sidenav">
          <p>我的帳戶</p>
          <hr />
          <Link to="" onClick={() => setInfoData("1")}>
            帳戶資料
          </Link>
          <Link to="" onClick={() => setInfoData("2")}>
            我的收藏
          </Link>
          <Link
            to=""
            onClick={() => {
              setInfoData("3");
              setProposal("1");
            }}
          >
            提案紀錄
          </Link>
          <Link
            to=""
            onClick={() => {
              setInfoData("4");
              setTakethecase("1");
            }}
          >
            接案紀錄
          </Link>
        </div>
      )}
    </div>
  );
}

export default SideNav;
