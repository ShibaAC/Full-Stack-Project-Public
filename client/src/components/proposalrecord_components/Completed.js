import React from "react";
import "./completed.css";

function Completed(props) {
  const { currentProposalCases } = props;
  const completedCases = [
    {
      創建者id: "A01",
      caseId: "1",
      案件名稱: "RWD網站設計",
      成交金額: "5萬",
      完成日期: "2023/07/13",
      成交對象: "張文彥",
    },
  ];

  return (
    <div>
      {currentProposalCases.length !== 0 ? (
        currentProposalCases.map((item) => (
          <div
            className="recordDiv3"
            style={{ marginLeft: "3rem", marginRight: "3rem", width: "auto" }}
            key={item.caseID}
          >
            <div className="d-flex align-items-center">
              <span className="span1 flex-grow-1">案件名稱</span>
              <span className="span1 flex-grow-1">成交金額</span>
              <span className="span1 flex-grow-1">完成日期</span>
              <span className="span1 flex-grow-1 del1">成交對象</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="span2 flex-grow-1">{item["caseName"]}</span>
              <span className="span2 flex-grow-1">{item["finalMoney"]}</span>
              <span className="span2 flex-grow-1">{item["completeTime"]}</span>
              <span className="span2 flex-grow-1 del1">{item["userName"]}</span>
            </div>
          </div>
        ))
      ) : (
        <h1 className="noData">尚未完成案件</h1>
      )}
    </div>
  );
}

export default Completed;
