import React from "react";
import "./closed.css";

function Closed(props) {
  const { currentRecordCases } = props;

  const closedCases = [
    {
      創建者id: "A45",
      caseId: "1",
      案件名稱: "阿里巴巴語言家教",
      報價金額: "15萬",
      結案日期: "2023/07/13",
      成交狀態: "已成交",
    },
  ];
  return (
    <div>
      {currentRecordCases.length !== 0 ? (
        currentRecordCases.map((item) => (
          <div
            className="recordDiv3"
            style={{ marginLeft: "3rem", marginRight: "3rem", width: "auto" }}
            key={item["caseID"]}
          >
            <div className="d-flex align-items-center">
              <span className="span1 flex-grow-1">案件名稱</span>
              <span className="span1 flex-grow-1">成交金額</span>
              <span className="span1 flex-grow-1">結案日期</span>
              <span className="span1 flex-grow-1 del1">成交狀態</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="span2 flex-grow-1">{item["caseName"]}</span>
              <span className="span2 flex-grow-1">{item["finalMoney"]}</span>
              <span className="span2 flex-grow-1">{item["completeTime"]}</span>
              <span
                className="span2 flex-grow-1 del1"
                style={{ color: "green" }}
              >
                {item["caseStatus"]}
              </span>
            </div>
          </div>
        ))
      ) : (
        <h1 className="noData">尚未結案</h1>
      )}
    </div>
  );
}

export default Closed;
