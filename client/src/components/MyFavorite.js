import React, { useEffect, useState } from "react";
import "./myfavorite.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Auth from "../axios/Auth";


function MyFavorite() {
  // const [star, setStar] = useState(false);
  const [collectionCase, setCollectionCase] = useState([])
  // const [collectionState, setcollectionState] = useState([])
  const [isFavorite, setIsFavorite] = useState(false);

  const [cases, setCases] = useState([
    {
      imgSrc:
        "https://www.funtime.com.tw/blog/wp-content/uploads/2017/08/84.jpg",
      name: "案件標題",
      place: "地點",
      price: "預算",
      deadline: "預計完成日期",
      caseStar: true,
    }
  ]);

  // 載入時就寫入 localStorage，確保起初渲染就有狀態
  useEffect(() => {
    cases.map((item, index) => {
      localStorage.setItem(`myStar${index}`, JSON.stringify(item.caseStar));
    });
  }, [cases]);

  useEffect(() => {
    Auth.enterFavorite(localStorage.getItem("userID"), 1)
      .then((response) => {
        console.log(response);
        setCollectionCase(response["data"]);

        const favoriteStatus = {};
        response["data"].forEach((item) => {
          favoriteStatus[item.caseID] = true;
        });
        setIsFavorite(favoriteStatus);
      })
      .catch((error) => {
        console.error("更新失败:", error);
      });
  }, []);

  const handleStar = (userID, caseID) => {
    const updatedFavorite = !isFavorite[caseID]; // 切換收藏狀態
  
    Auth.collectionState(userID, caseID)
      .then((response) => {
        console.log(response);
        setIsFavorite(prevState => ({ ...prevState, [caseID]: updatedFavorite }));
        if (!updatedFavorite) {
          setCollectionCase(prevState => prevState.filter(item => item.caseID !== caseID));
        }
      })
      .catch((error) => {
        console.error("更新失敗:", error);
      });
  };
  

return (
  <div className="caseDiv">
    {/* 顯示案子 */}
    <section className="d-flex flex-wrap">
      {collectionCase.map((item, index) => (
        <div className="case1 border border-2 border-warning p-2" key={index}>
          <img
            src={item.imgSrc}
            alt="img"
            width={150}
            height={100}
            className="mb-3"
          />
          <p>案件標題{item.caseName}</p>
          <p>地點{item.city}</p>
          <p>預算{item.budget}</p>
          <p>預計完成日期{item.deadline}</p>
          <Link className="moreView" to={"/caseview"}>
            more view
          </Link>
          {/* 愛心 Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            // fill="currentColor"
            fill={isFavorite[item.caseID] ? "#ffc400" : "#c0c0c0"}
            className="bi bi-star-fill caseStar"
            viewBox="0 0 16 16"
            onClick={() => {
              // 動態獲取myuserID和mycaseID並調用handleStar
              handleStar(localStorage.getItem('userID'), item.caseID)
            }}


          // style={{
          //   // 我將 || 移除 因為用 useeffect 先載入確保有 【myStar${index}】
          //   color: JSON.parse(localStorage.getItem(`myStar${index}`))
          //     ? "#ffc400"
          //     : "#c0c0c0",
          // }}
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </div>
      ))}
    </section>
    {/* 顯示page */}
    <div className="d-flex casePag">
      <ul className="pagination">
        <li className="page-item">
          <p className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </p>
        </li>
        <li className="page-item">
          <p className="page-link" href="#">
            1
          </p>
        </li>
        <li className="page-item">
          <p className="page-link" href="#">
            2
          </p>
        </li>
        <li className="page-item">
          <p className="page-link" href="#">
            3
          </p>
        </li>
        <li className="page-item">
          <p className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
);
}

export default MyFavorite;