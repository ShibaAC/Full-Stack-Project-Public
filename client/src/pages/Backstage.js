///
import React, { useContext, useEffect, useState } from "react";
import back from "../axios/back";
import "./Backstage.css";
import { GlobelDate } from "../App";

function PageButtons({ totalPages, currentPage, onPageChange }) {
  const visiblePageCount = 5;
  const halfVisiblePageCount = Math.floor(visiblePageCount / 2);
  const { AllCase1, setAllCase1 } = useContext(GlobelDate);

  const calculateVisiblePages = () => {
    const startPage = Math.max(1, currentPage - halfVisiblePageCount);
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
    return Array.from(
      {
        length: Math.min(totalPages, endPage - startPage + 1),
        // endPage - startPage + 1 < totalPages
        //   ? totalPages
        //   : endPage - startPage + 1,
      }, //總頁數，設最少為5頁
      (_, i) => startPage + i
    );
  };
  const onPageChange1 = (page) => {
    console.log(page);
    back
      .allcase(page)
      .then((result) => {
        setAllCase1(result["data"]);
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // console.log(calculateVisiblePages());

  return (
    <div className="pagination">
      {calculateVisiblePages().map((pageNum) => (
        <button
          key={pageNum}
          className={pageNum === currentPage ? "active" : ""}
          onClick={() => {
            onPageChange1(pageNum);
            onPageChange(pageNum);
          }}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
}

function Backstage() {
  const { AllCase1, setAllCase1, totalPages, setTotalPages } =
    useContext(GlobelDate);
  const [page, setPage] = useState(1);
  const [state, setState] = useState(0);
  const [AllUsers, setAllUsers] = useState([]);

  const handleCaseCancel = async (caseID) => {
    try {
      const result = await back.delcase(caseID);
      alert(result["data"][0]["result"]);
      updateCaseData();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCaseData = () => {
    back.allcase(page).then((result) => {
      setAllCase1(result["data"]);
    });
  };

  //叫api去資料庫抓總共有幾頁
  const getcasepage = () => {
    back.getcasepage().then((result) => {
      console.log(result["data"]);
      setTotalPages(result["data"][0]["casetotal"]); // Set the total pages
    });
  };

  const handlePageChange = (newPage) => {
    //getcasepage(); // 總共有幾頁
    setPage(newPage); // 設定目前案的頁面
  };

  useEffect(() => {
    back.alluser(page).then((result) => {
      setAllUsers(result["data"]);
    });
    back.allcase(page).then((result) => {
      setAllCase1(result["data"]);
    });
    getcasepage(); // Call getcasepage to update total pages
  }, [page]);

  return (
    <div className="container">
      <button className="selectButton" onClick={() => setState(1)}>
        所有會員
      </button>
      <button
        className="selectButton"
        onClick={() => {
          setState(2);
          getcasepage();
        }}
      >
        所有案件
      </button>

      {state === 1 && (
        <div className="allContainer">
          <input type="text" placeholder="搜尋案件或使用者" />

          <div>
            <h2>所有使用者</h2>
          </div>
          <table className="allTable">
            <thead>
              <tr className="trClass">
                <th className="thClass">姓名</th>
                <th className="thClass">信箱</th>
                <th className="thClass">電話</th>
                <th className="thClass">已發布案件</th>
                <th className="thClass">已完成案件</th>
                <th className="thClass">封鎖使用者</th>
              </tr>
            </thead>
            <tbody>
              {AllUsers.map((user, index) => (
                <tr class="bodyClass">
                  <td className="tdClass">{user.userName}</td>
                  <td className="tdClass">{user.email}</td>
                  <td className="tdClass">{user.phone}1</td>
                  <td className="tdClass">{user.publish}1</td>
                  <td className="tdClass">{user.finish}1</td>
                  <td className="tdClass">
                    <button className="buttonClass">下架</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {state === 2 && (
        <div className="allContainer">
          <input type="text" placeholder="搜尋案件或使用者" />

          <div>
            <h2>所有案件</h2>
          </div>
          <table className="allTable">
            <thead>
              <tr className="trClass">
                <th className="thClass">案件名稱</th>
                <th className="thClass">類別</th>
                <th className="thClass">地點</th>
                <th className="thClass">案件狀態</th>
                <th className="thClass">案主名稱</th>
                <th className="thClass">下架</th>
              </tr>
            </thead>
            <tbody>
              {AllCase1.map((Allcase, index) => (
                <tr className="bodyClass">
                  <td className="tdClass">{Allcase.caseName}</td>
                  <td className="tdClass">{Allcase.Class}</td>
                  <td className="tdClass">{Allcase.location}</td>
                  <td className="tdClass">{Allcase.caseStatus}</td>
                  <td className="tdClass">{Allcase.userName}</td>
                  <td className="tdClass">
                    <button
                      className="buttonClass"
                      onClick={() => {
                        handleCaseCancel(Allcase.caseID);
                        console.log(Allcase.caseID);
                      }}
                    >
                      下架
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        // <div>
        //   <h2>所有案件</h2>
        //   <ul>
        //     {AllCase.map((Allcase, index) => (
        //       <li key={index}>
        //         <li>{Allcase.caseName}</li>
        //         <li>{Allcase.Class}</li>
        //         <li>{Allcase.location}</li>
        //         <li>{Allcase.caseStatus}</li>
        //         <li>{Allcase.userName}</li>
        //       </li>
        //     ))}
        //   </ul>
        // </div>
      )}
      <PageButtons
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Backstage;
