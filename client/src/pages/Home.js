import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Case from "../axios/Case";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  // 母類別
  Case.getCategorys()
    .then((result) => {
      localStorage.setItem("bigClassNames", JSON.stringify(result["data"]));
    })
    .catch((err) => {
      console.error(err);
    });
  // 子類別
  Case.getSubCategorys()
    .then((result) => {
      localStorage.setItem("subBigClassNames", JSON.stringify(result["data"]));
    })
    .catch((err) => {
      console.error(err);
    });
  // 母地區
  Case.getCitys()
    .then((result) => {
      localStorage.setItem("bigCityNames", JSON.stringify(result["data"]));
    })
    .catch((err) => {
      console.error(err);
    });
  // 子地區
  Case.getSubCitys()
    .then((result) => {
      localStorage.setItem("subCityNames", JSON.stringify(result["data"]));
    })
    .catch((err) => {
      console.error(err);
    });
  return (
    <div className="container">
      <main>
        <div className="d-flex justify-content-evenly homeText">
          <Link to="/proposal" className="d-block">
            <div className="frameBox">
              <div className="caseWord">提案</div>
              <div className="get-case case-box"></div>
            </div>
          </Link>
          <Link to="/allCase">
            <div className="frameBox">
              <div className="caseWord">接案</div>
              <div className="send-case case-box"></div>
            </div>
          </Link>
        </div>
        <div className="homeText fs-1 text-center">最方便、快速的接案平台</div>
      </main>
      {/* <ToastContainer limit={1}/> */}
    </div>
  );
}

export default Home;
