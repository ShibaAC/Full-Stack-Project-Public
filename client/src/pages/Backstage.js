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
  const [state, setState] = useState(1);
  const [AllUsers, setAllUsers] = useState([]);

  const handleCaseCancel = async (caseID, caseName, lineID) => {
    try {
      const result = await back.delcase(caseID);
      console.log(result);
      handleButtonClick(lineID, caseName); // 在這邊叫handleButtonClick 把caseName傳進去叫他傳給後端再給python
      updateCaseData();
    } catch (err) {
      console.log(err);
    }
  };
  ///////////////
  const handleButtonClick = (lineID, caseName) => {
    console.log("caseName＝", caseName);
    console.log("lineID＝", lineID);
    back.line(lineID, caseName).then((result) => {
      console.log("api結果=", result);
    });
  };

  ////////////////////////////////

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
      console.log(result);
      setAllCase1(result["data"]);
    });
    getcasepage(); // Call getcasepage to update total pages
  }, [page]);

  ///////////////////
  const [searchTerm, setSearchTerm] = useState(""); // 新增搜尋關鍵字狀態
  const [searchResults, setSearchResults] = useState([]); // 新增搜尋結果狀態

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    //console.log(keyword);
    // 使用過濾來篩選搜尋結果
    const filteredResults = AllUsers.filter((user) =>
      user.userName.includes(keyword)
    );
    console.log(filteredResults);
    setSearchResults(filteredResults);
  };

  ///////////////////

  const [caseSearchTerm, setCaseSearchTerm] = useState(""); // 新增案件搜尋關鍵字狀態
  const [caseSearchResults, setCaseSearchResults] = useState([]); // 新增案件搜尋結果狀態

  const handleCaseSearch = (e) => {
    const keyword = e.target.value;
    setCaseSearchTerm(keyword);

    // 使用過濾來篩選案件搜尋結果
    const filteredCaseResults = AllCase1.filter((caseItem) =>
      caseItem.caseName.includes(keyword)
    );
    setCaseSearchResults(filteredCaseResults);
  };

  //////////////////////////
  const handleClearSearch = () => {
    setSearchTerm(""); // 清空搜尋關鍵字
  };
  const handleClearSearchCase = () => {
    setCaseSearchTerm(""); // 清空搜尋關鍵字
  };
  /////////////

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
          <div className="searchContainer">
            <input
              type="text"
              placeholder="搜尋案件或使用者"
              value={searchTerm}
              onChange={handleSearch}
              className="searchButton"
            />
            {searchTerm && (
              <button className="clearButton" onClick={handleClearSearch}>
                <span> × </span>
              </button>
            )}
          </div>
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
              {searchTerm ? (
                <>
                  {searchResults.map((result) => (
                    <tr class="bodyClass">
                      <td className="tdClass">{result.userName}</td>
                      <td className="tdClass">{result.email}</td>
                      <td className="tdClass">{result.phone}</td>
                      <td className="tdClass">{result.publish}</td>
                      <td className="tdClass">{result.finish}</td>
                      <td className="tdClass">
                        <button className="buttonClass">封鎖</button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {AllUsers.map((user, index) => (
                    <tr class="bodyClass trClass">
                      <td className="tdClass">{user.userName}</td>
                      <td className="tdClass">{user.email}</td>
                      <td className="tdClass">{user.phone}</td>
                      <td className="tdClass">{user.publish}</td>
                      <td className="tdClass">{user.finish}</td>
                      <td className="tdClass">
                        <button className="buttonClass">封鎖</button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
      {state === 2 && (
        <div className="allContainer">
          <div className="searchContainer">
            <input
              type="text"
              placeholder="搜尋案件或使用者"
              value={caseSearchTerm}
              onChange={handleCaseSearch}
              className="searchButton"
            />
            {caseSearchTerm && (
              <button className="clearButton" onClick={handleClearSearchCase}>
                <span> × </span>
              </button>
            )}
          </div>
          <div>
            <h2>所有案件</h2>
            {/* <button onClick={handleButtonClick}>呼叫 API</button> */}
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
              {caseSearchTerm ? (
                <>
                  {caseSearchResults.map((Allcase, index) => (
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
                            handleCaseCancel(Allcase.caseID, Allcase.lineID);
                            console.log(Allcase.caseID, Allcase.lineID);
                          }}
                        >
                          下架
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {AllCase1.map((Allcase, index) => (
                    <tr className="bodyClass trClass">
                      <td className="tdClass">{Allcase.caseName}</td>
                      <td className="tdClass">{Allcase.Class}</td>
                      <td className="tdClass">{Allcase.location}</td>
                      <td className="tdClass">{Allcase.caseStatus}</td>
                      <td className="tdClass">{Allcase.userName}</td>
                      <td className="tdClass">
                        <button
                          className="buttonClass"
                          onClick={() => {
                            handleCaseCancel(
                              Allcase.caseID,
                              Allcase.caseName,
                              Allcase.lineID
                            );
                            console.log(Allcase.caseID);
                          }}
                        >
                          下架
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
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
