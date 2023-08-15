import React, { useEffect, useState, useContext } from "react";
import "./AllCase.css";
import { Link, useNavigate } from "react-router-dom";
import Case from "../axios/Case";
import MenuIndex from "../components/allCaseMenu/MenuIndex";
import { GlobelDate } from "../App";
import logoIamge from "../imgs/logo.jpg";
import bookIamge from "../imgs/proposalFiles/book.jpg";
import skyIamge from "../imgs/proposalFiles/1.jpg";
import { Button, Menu, Space } from "antd";

function AllCase() {
  // 取得全域變數
  const { setCurrentCaseId } = useContext(GlobelDate);
  const navigate = useNavigate();

  // 處理頁數
  const [page, setPage] = useState(1);

  // 處理母子類別
  const [bigClassID, setBigClassID] = useState(""); // 目前點選的資料
  const [bigClassStr, setBigClassStr] = useState("null"); // 儲存所有被點選的資料
  const [subClassID, setSubClassID] = useState(""); // 目前點選的資料
  const [subClassStr, setSubClassStr] = useState("null"); // 儲存所有被點選的資料
  // 處理母子地區
  const [bigCityID, setBigCityID] = useState(""); // 目前點選的資料
  const [bigCityStr, setBigCityStr] = useState("null"); // 儲存所有被點選的資料
  const [subCityID, setSubCityID] = useState(""); // 目前點選的資料
  const [subCityStr, setSubCityStr] = useState("null"); // 儲存所有被點選的資料
  const [subCityArr, setSubCityArr] = useState([]); // 儲存所有被點選的資料 陣列型別

  const [cases, setCases] = useState([]); // 利用useEffect 獲得資料

  // 進到【home】就取得並放入localstorage 給【AllCase】 使用
  // 母類別
  const bigClassNames = JSON.parse(localStorage.getItem("bigClassNames"));
  // 子類別
  const subBigClassNames = JSON.parse(localStorage.getItem("subBigClassNames"));
  // 母地區
  const bigCityNames = JSON.parse(localStorage.getItem("bigCityNames"));
  // 子地區
  const subCityNames = JSON.parse(localStorage.getItem("subCityNames"));

  useEffect(() => {
    // setSubCityArr((preState) => [{ ...preState, subCityStr }]);
    // let a = subCityNames.filter((item) => {
    //   subCityArr.map((subCity) => {
    //     if (item["districtID"] === subCity) {
    //       return item["district"];
    //     }
    //   });
    // });
    // console.log(a);
    // 畫面一掛載從資料庫取得所有案件
    Case.getCases(bigClassStr, subClassStr, bigCityStr, subCityStr, page)
      .then((result) => {
        console.log(result["data"]);
        setCases(result["data"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [bigClassID, subClassID, bigCityID, subCityID, page]);

  return (
    <main className="container my-4">
      <div className="takeTheCaseBox d-flex">
        {bigClassNames === null ? (
          <h1>伺服器在睡覺中 勿擾</h1>
        ) : (
          <>
            {/* 左側篩選欄 */}
            <div className="condition mx-3" id="accordion city">
              <MenuIndex
                bigClassNames={bigClassNames}
                subBigClassNames={subBigClassNames}
                bigCityNames={bigCityNames}
                subCityNames={subCityNames}
                setBigClassID={setBigClassID}
                bigClassID={bigClassID}
                setBigClassStr={setBigClassStr}
                bigClassStr={bigClassStr}
                subClassID={subClassID}
                setSubClassID={setSubClassID}
                subClassStr={subClassStr}
                setSubClassStr={setSubClassStr}
                bigCityID={bigCityID}
                setBigCityID={setBigCityID}
                bigCityStr={bigCityStr}
                setBigCityStr={setBigCityStr}
                subCityID={subCityID}
                setSubCityID={setSubCityID}
                subCityStr={subCityStr}
                setSubCityStr={setSubCityStr}
              />
            </div>
            {/* 右側接案區 */}

            <div className="allCaseBox">
              {/* {subCityStr} */}
              {/* 顯示案子 */}
              <section className="case-div">
                {cases.map((item) => (
                  <div
                    className="case p-2"
                    key={item.caseID}
                    onClick={() => {
                      // 取得當前點擊的case ID，並導向至caseview
                      setCurrentCaseId(item.caseID);
                      navigate(`/caseview/${item.caseID}`);
                    }}
                  >
                    {/* 依母類別的預設圖 */}
                    {item.image !== null ? (
                      <img
                        src={`data:image/jpeg;base64, ${item.image}`} // 加上標頭
                        alt="img"
                        className="mb-3"
                      />
                    ) : item.bigClassID === "A" ? (
                      <img src={logoIamge} alt="img" className="mb-3" />
                    ) : item.bigClassID === "B" ? (
                      <img src={skyIamge} alt="img" className="mb-3" />
                    ) : (
                      <img src={bookIamge} alt="img" className="mb-3" />
                    )}
                    <p>案件標題 : {item.caseName}</p>
                    {item.city && (
                      <p>
                        地點: {item.city}
                        {item.district}
                      </p>
                    )}
                    <p>預算: {item.budget}</p>
                    <p>預計完成日期: {item.deadline? item.deadline: "無指定"}</p>
                    {/* <Link
                      className="moreView"
                      to={`/caseview/${item.caseID}`}
                      data-caseid={item.caseID}
                      onClick={(e) => {
                        // console.log(e.target["dataset"]["caseid"]);
                        // 取得當前點擊的case ID，並導向至caseview
                        setCurrentCaseId(e.target["dataset"]["caseid"]);
                      }}
                    >
                      more view
                    </Link> */}
                    <div className="d-flex justify-content-center">
                      <Space wrap>
                        <Button> 查看更多 </Button>
                      </Space>
                    </div>
                  </div>
                ))}
              </section>
              {/* 顯示page */}
              <ul className="pagination">
                <li className="page-item">
                  <p
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => setPage(page - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </p>
                </li>
                <li className="page-item">
                  <p className="page-link" onClick={() => setPage(1)}>
                    1
                  </p>
                </li>
                <li className="page-item">
                  <p className="page-link" onClick={() => setPage(2)}>
                    2
                  </p>
                </li>
                <li className="page-item">
                  <p className="page-link" onClick={() => setPage(3)}>
                    3
                  </p>
                </li>
                <li className="page-item">
                  <p
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => setPage(page + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </p>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default AllCase;
