// 剩下 進行中 還沒弄

import React, { useContext, useEffect, useState } from "react";
import "./proposalrecord.css";
import { GlobelDate } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Draft from "./proposalrecord_components/Draft";
import Publishing from "./proposalrecord_components/Publishing";
import Working from "./proposalrecord_components/Working";
import Removed from "./proposalrecord_components/Removed";
import Completed from "./proposalrecord_components/Completed";
import Auth from "../axios/Auth";

function ProposalRecord(props) {
  const { proposal, setProposal } = useContext(GlobelDate);
  const navigate = useNavigate();

  const {
    handleDelete,
    currentProposalState,
    currentProposalPages,
    currentProposalCases,
    setCurrentProposalState,
    setCurrentProposalPages,
    setCurrentProposalCases,
  } = props;

  // 渲染資料
  useEffect(() => {
    // CALL proposeCase(40,'進行中',1); 會報錯
    Auth.getProposeCase(
      JSON.parse(localStorage.getItem("userID")),
      currentProposalState,
      currentProposalPages
    )
      .then((result) => {
        console.log(result["data"]);
        setCurrentProposalCases(result["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentProposalState]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      localStorage.setItem(`showProg${i}`, JSON.stringify(null));
      localStorage.setItem(`arrow${i}`, JSON.stringify(null));
    }
  }, [proposal]);

  // 【草稿】與【已下架】需要
  const handleRevise = (caseID) => {
    Auth.caseRevise(caseID)
      .then((result) => {
        navigate("/proposal", {
          state: {
            caseID,
            caseInfo: result["data"],
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="infoData">
      <div
        className="d-flex recordDiv1"
        style={{ marginLeft: "3rem", marginRight: "3rem", width: "auto" }}
      >
        <div
          className="recordDiv2"
          onClick={() => {
            setProposal(1);
            setCurrentProposalState("草稿");
          }}
          style={{ backgroundColor: proposal === 1 && "#ffa500" }}
        >
          <Link className="white1">草稿</Link>
        </div>
        <div
          className="recordDiv2"
          onClick={() => {
            setProposal(2);
            setCurrentProposalState("刊登中");
          }}
          style={{ backgroundColor: proposal === 2 && "#ffa500" }}
        >
          <Link className="white1">刊登中</Link>
        </div>
        <div
          className="recordDiv2"
          onClick={() => {
            setProposal(3);
            setCurrentProposalState("進行中");
          }}
          style={{ backgroundColor: proposal === 3 && "#ffa500" }}
        >
          <Link className="white1">進行中</Link>
        </div>
        <div
          className="recordDiv2"
          onClick={() => {
            setProposal(4);
            setCurrentProposalState("已下架");
          }}
          style={{ backgroundColor: proposal === 4 && "#ffa500" }}
        >
          <Link className="white1">已下架</Link>
        </div>
        <div
          className="recordDiv2"
          onClick={() => {
            setProposal(5);
            setCurrentProposalState("已結案");
          }}
          style={{ backgroundColor: proposal === 5 && "#ffa500" }}
        >
          <Link className="white1">已結案</Link>
        </div>
      </div>
      {proposal === 1 && (
        <Draft
          currentProposalCases={currentProposalCases}
          handleDelete={handleDelete}
          handleRevise={handleRevise}
        />
      )}
      {proposal === 2 && (
        <Publishing currentProposalCases={currentProposalCases} />
      )}
      {proposal === 3 && (
        <Working currentProposalCases={currentProposalCases} />
      )}
      {proposal === 4 && (
        <Removed
          currentProposalCases={currentProposalCases}
          handleDelete={handleDelete}
          handleRevise={handleRevise}
        />
      )}
      {proposal === 5 && (
        <Completed currentProposalCases={currentProposalCases} />
      )}
    </div>
  );
}

export default ProposalRecord;
