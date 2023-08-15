import React, { useContext, useEffect, useState } from "react";
import "./takethecaserecord.css";
import { Link } from "react-router-dom";
import { GlobelDate } from "../App";
import Quoted from "./takethecaserecord_components/Quoted";
import Closed from "./takethecaserecord_components/Closed";
import Working from "./takethecaserecord_components/Working";
import UnClinch from "./takethecaserecord_components/UnClinch";
import Auth from "../axios/Auth";

function TakeTheCaseRecord(props) {
  const { takethecase, setTakethecase } = useContext(GlobelDate);

  const {
    handleDelete,
    currentRecordState,
    currentRecordPages,
    currentRecordCases,
    setCurrentRecordState,
    setCurrentRecordPages,
    setCurrentRecordCases,
  } = props;
  // 渲染資料
  useEffect(() => {
    Auth.getBidderCase(
      JSON.parse(localStorage.getItem("userID")),
      currentRecordState,
      1
    )
      .then((result) => {
        console.log(result["data"]);
        setCurrentRecordCases(result["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentRecordState]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      localStorage.setItem(`showProg${i}`, JSON.stringify(null));
      localStorage.setItem(`arrow${i}`, JSON.stringify(null));
    }
  }, [takethecase]);
  return (
    <div className="infoData">
      <div
        className="d-flex recordDiv1"
        style={{ marginLeft: "3rem", marginRight: "3rem", width: "auto" }}
      >
        <div
          className="recordDiv2"
          onClick={() => {
            setTakethecase(1);
            setCurrentRecordState("已報價");
          }}
          style={{ backgroundColor: takethecase === 1 && "#ffa500" }}
        >
          <Link className="white1">已報價</Link>
        </div>
        <div
          className="recordDiv2"
          onClick={() => {
            setTakethecase(2);
            setCurrentRecordState("未成交");
          }}
          style={{ backgroundColor: takethecase === 2 && "#ffa500" }}
        >
          <Link className="white1">未成交</Link>
        </div>
        <div
          className="recordDiv2"
          onClick={() => {
            setTakethecase(3);
            setCurrentRecordState("進行中");
          }}
          style={{ backgroundColor: takethecase === 3 && "#ffa500" }}
        >
          <Link className="white1">進行中</Link>
        </div>
        <div
          className="recordDiv2"
          onClick={() => {
            setTakethecase(4);
            setCurrentRecordState("已結案");
          }}
          style={{ backgroundColor: takethecase === 4 && "#ffa500" }}
        >
          <Link className="white1">已結案</Link>
        </div>
      </div>
      {takethecase === 1 && <Quoted currentRecordCases={currentRecordCases} />}
      {takethecase === 2 && (
        <UnClinch
          currentRecordCases={currentRecordCases}
          handleDelete={handleDelete}
        />
      )}
      {takethecase === 3 && <Working currentRecordCases={currentRecordCases} />}
      {takethecase === 4 && <Closed currentRecordCases={currentRecordCases} />}
    </div>
  );
}

export default TakeTheCaseRecord;
