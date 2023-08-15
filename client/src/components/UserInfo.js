import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./userinfo.css";
import Case from "../axios/Case";
import { GlobelDate } from "../App";
import Payment from "../axios/Payment";
import Auth from "../axios/Auth";

function UserInfo(props) {
  const { caseID } = useParams();
  const navigate = useNavigate();
  // 取得全域變數
  const { setInfoData, currentCaseId, setEcpayHtml } = useContext(GlobelDate);
  // 從 CaseView 取得資料
  const { caseName, contactName, contactPhone, caseState, bulidCaseUserID, profilePhoto } = props;

  // caseID , userID , quotation , win , selfRecommended
  const [quotation, setQuotation] = useState(0); // 報價金額
  const [win, setWin] = useState(false); // 預設
  const [selfRecommended, setSelfRecommended] = useState(""); // 自我推薦

  // 綠界資訊
  const [MerchantTradeNo, setMerchantTradeNo] = useState("Test000"); // !不可以空格
  // const [ItemName, setItemName] = useState("Test123");
  const [ItemName, setItemName] = useState(caseName);
  const [TotalAmount, setTotalAmount] = useState(50);
  // const [TradeDesc, setTradeDesc] = useState("Test123");
  const [TradeDesc, setTradeDesc] = useState(`${caseName} 50元 * 1`);

  // 案主資訊 ------------
  const [caseOwnerEdu, setCaseOwnerEdu] = useState(null);
  const [caseOwnerIntro, setCaseOwnerIntro] = useState(null);

  useEffect(() => {
    Auth.checkProfile(bulidCaseUserID)
      .then((result) => {
        console.log("checkProfile", result);
        if (result["data"].length !== 0) {
            setCaseOwnerEdu(result["data"][0]["education"]);
            setCaseOwnerIntro(result["data"][0]["selfIntroduction"]);
        }
      })
  }, [bulidCaseUserID]);

  const fileType = (file) => {
    if (file.charAt(0) === "/") {
      return "image/jpeg";
    } else if (file.charAt(0) === "i") {
      return "image/png";
    } else if (file.charAt(0) === "J") {
      return "application/pdf";
    } else if (file.charAt(0) === "U") {
      return "application/pdf";
    }
  };

  const handleBidder = () => {
    // 將訂單資訊傳入ECPay
    Payment.pay(MerchantTradeNo, ItemName, TotalAmount, TradeDesc, caseID)
      .then((result) => {
        console.log(result["data"]);
        setEcpayHtml(result["data"]);
        navigate("/Ecpay"); // ! 會由綠界跳轉所以不用設定
      })
      .catch((err) => {
        console.log(err);
      });
    // 將報價資訊寫入DB
    Case.newBidder(
      currentCaseId,
      JSON.parse(localStorage.getItem("userID")),
      quotation,
      win,
      selfRecommended
    )
      .then((result) => {
        console.log(result);
        // alert(result["data"][0]["result"]);
        setInfoData(4);
        navigate("/personalinfo");
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
   };
  return (
    <div className="user-info">
      {/* 案主資訊 */}
      <h1 className="text-center">案主資訊</h1>
      <div className="d-flex justify-content-evenly">
        <img
          className="caseOwnerImg"
          src={`data:image/${fileType(profilePhoto)};base64, ${profilePhoto}`}
          width={"100"}
          alt="img"
        />
        <div className="profile-info">
          {/* <p>XXX股份有限公司</p> */}
          <p>{contactName}</p>
        </div>
      </div>
      <div className="caseOwnerDesc">
        <p style={{marginBottom: 0}}>案主學歷: <span style={{fontSize: "16px"}}>{caseOwnerEdu? caseOwnerEdu : "無資訊"}</span></p>
        <p style={{marginBottom: 0}}>案主簡介: </p>
        <p className="caseOwnerDescText">{caseOwnerIntro? caseOwnerIntro : "無資訊"}</p>
        {caseState === "已報價" && (<p>聯絡電話: <span>{contactPhone? contactPhone : "無資訊"}</span></p>)}
      </div>


      {/* 假如未報價介面 */}
      {caseState === "未報價" && (
        <>
          {/* 自我推薦 */}
          <div className="input-group input-group-lg">
            <span
              className="input-group-text"
              id="inputGroup-sizing-lg"
              style={{ padding: "0" }}
            >
              自我推薦
            </span>
            <textarea
              type="text"
              rows={"5"}
              style={{ margin: 0 }}
              className="form-control"
              placeholder="請輸入您的自我推薦"
              required
              onChange={(e) => {
                setSelfRecommended(e.target.value);
              }}
            ></textarea>
          </div>
          {/* 顯示報價需花多少錢 */}
          <div>此任務報價需花費 50 元</div>
          {/* 報價金額 */}
          <div className="input-group input-group-lg">
            <span
              className="input-group-text"
              id="inputGroup-sizing-lg"
              style={{ padding: "0" }}
            >
              報價金額
            </span>
            <input
              type="text"
              style={{ margin: 0 }}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="請輸入您的報價"
              onChange={(e) => {
                setQuotation(e.target.value);
              }}
            />
          </div>
          {/* 我要報價 */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleBidder}
          >
            我要報價
          </button>
        </>
      )}

      {/* 假如已報價介面 */}
      {/* 需再調整 */}
      {caseState === "已報價" && (
        <>
          <button type="button" className="btn btn-secondary alreadyQuotationBtn">
            已報價
          </button>
        </>
      )}
    </div>
  );
}

export default UserInfo;
