import React, { useContext, useState } from "react";
import "./personalinfo.css";
import SideNav from "../components/SideNav";
import InfoData from "../components/InfoData";
import { GlobelDate } from "../App";
import MyFavorite from "../components/MyFavorite";
import ProposalRecord from "../components/ProposalRecord";
import TakeTheCaseRecord from "../components/TakeTheCaseRecord";
import Auth from "../axios/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PersonalInfo() {
  const { infoData } = useContext(GlobelDate);

  // ProposalRecord
  const [currentProposalState, setCurrentProposalState] = useState("草稿"); // 儲存被點擊的狀態
  const [currentProposalPages, setCurrentProposalPages] = useState(1); // 儲存頁數
  const [currentProposalCases, setCurrentProposalCases] = useState([]); // 儲存當前取得的案件

  // TakeTheCaseRecord
  const [currentRecordState, setCurrentRecordState] = useState("已報價"); // 儲存被點擊的狀態
  const [currentRecordPages, setCurrentRecordPages] = useState(1); // 儲存頁數
  const [currentRecordCases, setCurrentRecordCases] = useState([]); // 儲存當前取得的案件

  // 處理刪除 => 提案紀錄的草稿、接案紀錄的未成交
  const handleDelete = (caseID) => {
    toast.info("刪除成功", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // alert(caseID);
    Auth.deleteCase(caseID)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex persInfoBody">
      <SideNav />
      {infoData === "1" && <InfoData />}
      {infoData === "2" && <MyFavorite />}
      {infoData === "3" && (
        <ProposalRecord
          handleDelete={handleDelete}
          currentProposalState={currentProposalState}
          setCurrentProposalState={setCurrentProposalState}
          currentProposalPages={currentProposalPages}
          setCurrentProposalPages={setCurrentProposalPages}
          currentProposalCases={currentProposalCases}
          setCurrentProposalCases={setCurrentProposalCases}
        />
      )}
      {infoData === "4" && (
        <TakeTheCaseRecord
          handleDelete={handleDelete}
          currentRecordState={currentRecordState}
          setCurrentRecordState={setCurrentRecordState}
          currentRecordPages={currentRecordPages}
          setCurrentRecordPages={setCurrentRecordPages}
          currentRecordCases={currentRecordCases}
          setCurrentRecordCases={setCurrentRecordCases}
        />
      )}
      {/* <ToastContainer limit={1}/> */}
    </div>
  );
}

export default PersonalInfo;
