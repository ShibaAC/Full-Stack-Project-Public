import React, { useContext, useEffect, useState } from "react";
import "./working.css";
import Auth from "../../axios/Auth";
import { GlobelDate } from "../../App";

function Working(props) {
  const { currentRecordCases } = props;

  // fake data
  const workingCase = [
    {
      創建者id: "A23",
      caseId: "1",
      案件名稱: "RWD網站設計",
      報價金額: "5萬",
      成交日期: "2023/07/04",
      成交對象: "張文彥",
      階段數量: 2,
      案件進度: 1,
      deadLine0: "2023/07/04",
      deadLine1: "2023/07/14",
      deadLine2: "2023/07/24",
      deadLine3: "2023/08/03",
      階段1結清: "未結清",
      階段2結清: "未結清",
      階段3結清: "未結清",
    },
    {
      創建者id: "A73",
      caseId: "2",
      案件名稱: "遛狗",
      報價金額: "100",
      成交日期: "2023/07/12",
      成交對象: "張文彥",
      階段數量: 5,
      案件進度: 0,
      deadLine0: "2023/07/12",
      deadLine1: "2023/07/14",
      deadLine2: "2023/07/24",
      deadLine3: "2023/08/03",
      deadLine4: "2023/08/13",
      deadLine5: "2023/08/23",
      階段1結清: "未結清",
      階段2結清: "未結清",
      階段3結清: "未結清",
      階段4結清: "未結清",
      階段5結清: "未結清",
    },
  ];

  // 處理進行中
  const handleCaseStep = (item) => {
    // 變更 localStorage 內的資料
  };

  // progress bar
  const progBar = (caseProgress, caseID, i) => {
    return (
      ((caseProgress[caseID][i]["caseSchedule"] - 1) /
        (caseProgress[caseID][i]["總流程"] - 1)) *
      100
    );
  };

  // check complete
  const completedBtn = (i, caseID, deadLine, bidder) => {
    if (i === 0 && bidder != 1) {
      return (
        <div
          className="btn1"
          onClick={() => {
            handleStepConfirm(caseID, deadLine);
          }}
        >
          達成
        </div>
      );
    }
  };
  const [recall, setRecall] = useState(false);
  const [alert1, setAlert1] = useState(0);
  const handleStepConfirm = (caseID, deadLine) => {
    if (alert1 === 0) {
      window.confirm("是否確定達成？ (等待案主確認領收)");
      setAlert1(!alert1);
    }
    if (window.confirm("是否確定達成？ (等待案主確認領收)") == true) {
      Auth.stepConfirm(localStorage.getItem("userID"), caseID, deadLine)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
      setTimeout(() => setRecall(!recall), 500);
    }
  };
  console.log(recall);
  const circle = (caseProgress, caseID) => {
    let circleResult = [];

    for (let i = 0; i < caseProgress[caseID][0]["caseSchedule"]; i++) {
      circleResult.push(
        <div className="progressCircle" key={i}>
          <div
            className="progCircle"
            style={{ backgroundColor: "#4798b3" }}
          ></div>
          <div className="deadLine" style={{ fontSize: ".9rem" }}>
            {i === 0 ? "成交日期" : "截止日期"}：
            {caseProgress[caseID][i]["stepDeadline"]}
          </div>
          <div
            className="right1"
            style={{
              color:
                caseProgress[caseID][i]["moneyStatus"] === "未結清"
                  ? "red"
                  : "green",
              width: "3rem",
            }}
          >
            {caseProgress[caseID][i]["moneyStatus"]}
          </div>
          <div className="caseMoney">
            階段金額：
            {caseProgress[caseID][i]["money"]}
          </div>
        </div>
      );
    }

    for (
      let i = 0;
      i <
      caseProgress[caseID][0]["總流程"] -
        caseProgress[caseID][0]["caseSchedule"];
      i++
    ) {
      circleResult.push(
        <div className="progressCircle" key={i + 10}>
          {completedBtn(
            i,
            caseID,
            caseProgress[caseID][caseProgress[caseID][0]["caseSchedule"] + i][
              "stepDeadline"
            ],
            caseProgress[caseID][caseProgress[caseID][0]["caseSchedule"] + i][
              "bidder"
            ]
          )}
          <div
            className="progCircle"
            style={{ backgroundColor: "#b8b8b8" }}
          ></div>

          <div className="deadLine" style={{ fontSize: ".9rem" }}>
            截止日期：
            {
              caseProgress[caseID][i + caseProgress[caseID][0]["caseSchedule"]][
                "stepDeadline"
              ]
            }
          </div>

          <div
            className="right1"
            style={{
              color:
                caseProgress[caseID][
                  i + caseProgress[caseID][0]["caseSchedule"]
                ]["moneyStatus"] === "未結清"
                  ? "red"
                  : "green",
              width: "3rem",
            }}
          >
            {
              caseProgress[caseID][i + caseProgress[caseID][0]["caseSchedule"]][
                "moneyStatus"
              ]
            }
          </div>
          <div className="caseMoney">
            階段金額：
            {
              caseProgress[caseID][i + caseProgress[caseID][0]["caseSchedule"]][
                "money"
              ]
            }
          </div>
        </div>
      );
    }
    for (let i = 0; i < caseProgress[caseID][0]["總流程"]; i++) {
      circleResult.push(
        <div className="progress prog1">
          <div
            className="progress-bar "
            style={{ width: `${progBar(caseProgress, caseID, i)}%` }}
          ></div>
        </div>
      );
    }

    return circleResult;
  };

  const [caseProgress2, setCaseProgress2] = useState({});

  let caseItem = {};

  useEffect(() => {
    setAlert1(!alert1);
    Auth.enterCaseStepBidder(JSON.parse(localStorage.getItem("userID")), "1")
      .then((result) => {
        // console.log(result);
        result["data"].map((myCase) => {
          const caseID = myCase["caseID"];
          if (!caseItem[caseID]) {
            // console.log(caseItem[caseID]);
            caseItem = { ...caseItem, [caseID]: [myCase] };
            // console.log(caseItem);
          } else {
            // console.log("123");
            caseItem[caseID].push(myCase);
          }
        });
        // console.log(caseItem);
        setCaseProgress2(caseItem);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [recall]);

  console.log(caseProgress2);
  //
  const [show, setShow] = useState(true);
  //
  const [arrowStyle, setArrowStyle] = useState();

  return (
    <div>
      {currentRecordCases.length !== 0 ? (
        currentRecordCases.map((item, index) => (
          <div
            className="recordDiv31"
            style={{ marginLeft: "3rem", marginRight: "3rem", width: "auto" }}
            key={item["caseID"]}
          >
            {/* 上方案件資訊 Title */}
            <div className="d-flex align-items-center">
              <span className="span1 flex-grow-1">案件名稱</span>
              <span className="span1 flex-grow-1">成交金額</span>
              <span className="span1 flex-grow-1">成交日期</span>
              <span className="span1 flex-grow-1 del1">成交對象</span>
            </div>

            {/* 上方案件資訊 data */}
            <div className="d-flex align-items-center">
              <span className="span2 flex-grow-1">{item["caseName"]}</span>
              <span className="span2 flex-grow-1">{item["finalMoney"]}</span>
              <span className="span2 flex-grow-1">{item["dealTime"]}</span>
              <span className="span2 flex-grow-1 del1">{item["userName"]}</span>
            </div>

            {/* 下拉式Icon */}
            {JSON.parse(localStorage.getItem(`showProg${index}`)) && (
              <div className="progress1">
                {circle(caseProgress2, item["caseID"])}
              </div>
            )}

            {/* Show 進度條 */}
            <div className="arrowDiv">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-bar-up arrow2"
                viewBox="0 0 16 16"
                style={
                  JSON.parse(localStorage.getItem(`arrow${index}`)) || {
                    transform: "scaleY(-1)",
                  }
                }
                onClick={() => {
                  localStorage.setItem(
                    `showProg${index}`,
                    !JSON.parse(localStorage.getItem(`showProg${index}`))
                  );

                  JSON.parse(localStorage.getItem(`showProg${index}`))
                    ? localStorage.setItem(
                        `arrow${index}`,
                        JSON.stringify({
                          position: "relative",
                          bottom: "2rem",
                        })
                      )
                    : localStorage.setItem(
                        `arrow${index}`,
                        JSON.stringify({
                          transform: "scaleY(-1)",
                          position: "relative",
                        })
                      );
                  // 為了確保每一次都能渲染
                  setShow(!show);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </div>
          </div>
        ))
      ) : (
        <h1 className="noData">尚未進行案件</h1>
      )}
    </div>
  );
}

export default Working;
