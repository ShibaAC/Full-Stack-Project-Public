import React from "react";
import "./draft.css";
import Auth from "../../axios/Auth";

function Draft(props) {
  const { currentProposeCases, handleDelete } = props;
  return (
    <div>
      {currentProposeCases.length !== 0 ? (
        currentProposeCases.map((item) => (
          <div className="recordDiv3" key={item.caseID}>
            <div className="d-flex align-items-center">
              <span className="span1 flex-grow-1">案件名稱</span>
              <span className="span1 flex-grow-1">預算金額</span>
              <span className="span1 flex-grow-1">儲存日期</span>
              <span className="span1 del1">操作</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="span2 flex-grow-1">{item["caseName"]}</span>
              <span className="span2 flex-grow-1">{item["budget"]}</span>
              <span className="span2 flex-grow-1">{item["updateTime"]}</span>
              <span className="span2 del1">
                <div className="del2" onClick={() => handleDelete(item.caseID)}>
                  刪除
                </div>
                <div className="del2">修改</div>
              </span>
            </div>
          </div>
        ))
      ) : (
        <h1>尚未有草稿</h1>
      )}
    </div>
  );
}

export default Draft;
