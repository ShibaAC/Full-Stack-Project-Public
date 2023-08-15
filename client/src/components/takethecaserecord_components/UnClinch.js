import React from "react";
import "./unclinch.css";

function UnClinch(props) {
  const { currentRecordCases, handleDelete } = props;

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
              <span className="span1 flex-grow-1">報價金額</span>
              <span className="span1 flex-grow-1">報價日期</span>
              <span className="span1 flex-grow-1 borderR">操作</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="span2 flex-grow-1">{item["caseName"]}</span>
              <span className="span2 flex-grow-1">{item["quotation"]}</span>
              <span className="span2 flex-grow-1">{item["bidTime"]}</span>
              <span
                className="span2 flex-grow-1 borderR"
                onClick={() => {
                  handleDelete(item.caseID);
                }}
              >
                刪除
              </span>
            </div>
          </div>
        ))
      ) : (
        <h1 className="noData">尚未成交</h1>
      )}
    </div>
  );
}

export default UnClinch;
