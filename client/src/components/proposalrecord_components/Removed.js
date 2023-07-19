import React from "react";
import "./removed.css";

function Removed() {
  const removedCases = [
    {
      創建者id: "A01",
      caseId: "1",
      案件名稱: "RWD網站設計",
      預算金額: "5萬",
      下架日期: "2023/07/07",
      操作1: "刪除",
      操作2: "修改",
    },
    {
      創建者id: "A02",
      caseId: "2",
      案件名稱: "阿巴巴語言家教",
      預算金額: "15萬",
      下架日期: "2023/07/07",
      操作1: "刪除",
      操作2: "修改",
    },
    {
      創建者id: "A03",
      caseId: "3",
      案件名稱: "清潔馬桶",
      預算金額: "5千",
      下架日期: "2023/07/07",
      操作1: "刪除",
      操作2: "修改",
    },
    {
      創建者id: "A41",
      caseId: "4",
      案件名稱: "遛狗",
      預算金額: "1萬",
      下架日期: "2023/07/07",
      操作1: "刪除",
      操作2: "修改",
    },
  ];

  return (
    <div>
      {removedCases.map((item, index) => (
        <div className="recordDiv3" key={item["caseId"]}>
          <div className="d-flex align-items-center">
            <span className="span1 flex-grow-1">案件名稱</span>
            <span className="span1 flex-grow-1">預算金額</span>
            <span className="span1 flex-grow-1">下架日期</span>
            <span className="span1 del1">操作</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="span2 flex-grow-1">{item["案件名稱"]}</span>
            <span className="span2 flex-grow-1">{item["預算金額"]}</span>
            <span className="span2 flex-grow-1">{item["下架日期"]}</span>
            <span className="span2 del1">
              <div className="del2">{item["操作1"]}</div>
              <div className="del2">{item["操作2"]}</div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Removed;