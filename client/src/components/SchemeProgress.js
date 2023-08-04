import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobelDate } from "../App";
import Scheme from "../axios/Scheme";

// Scheme 的 component
function SchemeProgress(props) {
  const navigate = useNavigate();
  const { setInfoData, currentCaseId } = useContext(GlobelDate);
  const { progressStatus, bidderID, finalPrice } = props;
  // 每個階段的 時間與報酬 => 有沒有辦法動態生成
  const [stage1Date, setStage1Date] = useState("");
  const [stage1Price, setStage1Price] = useState(0);
  const [schemeTextArea1, setSchemeTextArea1] = useState("");
  const [stage2Date, setStage2Date] = useState("");
  const [stage2Price, setStage2Price] = useState(0);
  const [schemeTextArea2, setSchemeTextArea2] = useState("");
  const [stage3Date, setStage3Date] = useState("");
  const [stage3Price, setStage3Price] = useState(0);
  const [schemeTextArea3, setSchemeTextArea3] = useState("");
  const [stage4Date, setStage4Date] = useState("");
  const [stage4Price, setStage4Price] = useState(0);
  const [schemeTextArea4, setSchemeTextArea4] = useState("");
  const [stage5Date, setStage5Date] = useState("");
  const [stage5Price, setStage5Price] = useState(0);
  const [schemeTextArea5, setSchemeTextArea5] = useState("");
  const [stage6Date, setStage6Date] = useState("");
  const [stage6Price, setStage6Price] = useState(0);
  const [schemeTextArea6, setSchemeTextArea6] = useState("");

  const stage = [
    {
      stage: "階段一",
      date: stage1Date,
      price: stage1Price,
      textArea: schemeTextArea1,
      dateFun: setStage1Date,
      priceFun: setStage1Price,
      testArea: setSchemeTextArea1,
    },
    {
      stage: "階段二",
      date: stage2Date,
      price: stage2Price,
      textArea: schemeTextArea2,
      dateFun: setStage2Date,
      priceFun: setStage2Price,
      testArea: setSchemeTextArea2,
    },
    {
      stage: "階段三",
      date: stage3Date,
      price: stage3Price,
      textArea: schemeTextArea3,
      dateFun: setStage3Date,
      priceFun: setStage3Price,
      testArea: setSchemeTextArea3,
    },
    {
      stage: "階段四",
      date: stage4Date,
      price: stage4Price,
      textArea: schemeTextArea4,
      dateFun: setStage4Date,
      priceFun: setStage4Price,
      testArea: setSchemeTextArea4,
    },
    {
      stage: "階段五",
      date: stage5Date,
      price: stage5Price,
      textArea: schemeTextArea5,
      dateFun: setStage5Date,
      priceFun: setStage5Price,
      testArea: setSchemeTextArea5,
    },
    {
      stage: "階段六",
      date: stage6Date,
      price: stage6Price,
      textArea: schemeTextArea6,
      dateFun: setStage6Date,
      priceFun: setStage6Price,
      testArea: setSchemeTextArea6,
    },
  ];

  // 轉程arr利用map渲染
  const runProgressStatusDiv = () => {
    const statusArr = [];
    for (let i = 0; i <= progressStatus; i++) {
      statusArr.push(stage[i]);
    }
    return statusArr;
  };

  // 處理跳轉及整合所有需傳遞給DB的資料
  // 整合成一串給資料庫
  let stageDate = [];
  let stagePrice = [];
  let schemeTextArea = [];
  let schemeJson = [];
  const handleBtn = () => {
    setInfoData("3");
    runProgressStatusDiv().map((item) => {
      stageDate.push(item.date);
      stagePrice.push(item.price);
      schemeTextArea.push(item.textArea);
    });

    // 轉成這個樣子給資料庫
    schemeJson.push({
      caseID: currentCaseId,
      detail: schemeTextArea,
      stepDeadline: stageDate,
      money: stagePrice,
    });
    schemeJson = JSON.stringify(schemeJson);
    // schemeJson = `${schemeJson}`;
    Scheme.newScheme(schemeJson, bidderID)
      .then((result) => {
        alert(result["data"][0][result]);
        navigate("/personalinfo");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      {runProgressStatusDiv().map((item, index) => (
        <div className="progress-status-div" key={index}>
          <p>{item.stage}</p>

          {item.stage === "階段一" ? <p>合作日期</p> : <p>完成日期</p>}
          <input
            type="date"
            onBlur={(event) => {
              item.dateFun(event.target.value);
            }}
          />
          {item.stage === "階段一" ? <p>訂金</p> : <p>報酬</p>}
          <input
            type="number"
            onBlur={(event) => {
              item.priceFun(event.target.value);
            }}
          />
          {/* 顯示備註欄 */}
          <div className="box">
            <h4 htmlFor="caseMoney">備註 :</h4>
            <textarea
              className="scheme-textarea"
              onChange={(event) => {
                item.testArea(event.target.value);
              }}
            ></textarea>
          </div>
        </div>
      ))}
      {/* btn */}
      <div className="box d-flex justify-content-evenly">
        {/* 跳轉至哪裡 => 先跳到個人帳戶 > 提案紀錄 */}
        {/* <Link to="/personalinfo" onClick={() => handleBtn()}> */}
        <Link onClick={() => handleBtn()}>
          <button type="button" className="btn btn-primary">
            合作愉快
          </button>
        </Link>
      </div>
    </>
  );
}

export default SchemeProgress;
