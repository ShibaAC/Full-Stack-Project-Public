import React from "react";
import "./draft.css";
import { Link } from "react-router-dom";

function Draft(props) {
  const { currentProposalCases, handleDelete, handleRevise } = props;
  const updateTime = "";
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
              <span className="span1 flex-grow-1">預算金額</span>
              <span className="span1 flex-grow-1">儲存日期</span>
              <span className="span1 flex-grow-1 del1">操作</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="span2 flex-grow-1">{item["caseName"]}</span>
              <span className="span2 flex-grow-1">{item["budget"]}</span>
              <span className="span2 flex-grow-1">{item["updateTime"]}</span>
              <span className="span2 flex-grow-1 del1">
                <div
                  className="del2"
                  onClick={() => handleDelete(item["caseID"])}
                >
                  刪除
                </div>
                {/* <Link className="del2" onClick={() => handleRevise(item["caseID"])} to='/proposal'>修改</Link> */}
                <div
                  className="del2"
                  onClick={() => handleRevise(item["caseID"])}
                >
                  修改
                </div>
              </span>
            </div>
          </div>
        ))
      ) : (
        <h1 className="noData">尚未有草稿</h1>
      )}
    </div>
  );
}

export default Draft;
