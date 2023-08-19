import React, { useContext, useEffect, useState } from "react";
import "./caseRecommend.css";
import { GlobelDate } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Case from "../axios/Case";
import Chat from "../axios/Chat";
import { io } from "socket.io-client";

function CaseRecommend(porps) {
  // 取得全域變數
  const { currentCaseId, setCurrentCaseId, setChatChatUser } =
    useContext(GlobelDate);

  // 從 props 結構賦值
  const { userEqual } = porps;

  // 跳轉介面
  const navigate = useNavigate();
  // 儲存推薦人員
  const [bridder, setBridder] = useState([]);
  // 儲存推薦人員
  const [recommendCases, setRecommendCases] = useState([]);

  // * socket.io
  const [socket, setSocket] = useState(null);
  const currentUserID = JSON.parse(localStorage.getItem("userID"));

  // 取得推薦案件、推薦人員
  useEffect(() => {
    // 推薦案件
    Case.getSimilarCase(
      currentCaseId,
      JSON.parse(localStorage.getItem("userID"))
    )
      .then((result) => {
        setRecommendCases(result["data"]);
        console.log(result["data"]);
      })
      .catch((err) => {
        console.error(err);
      });

    // 報價人員
    Case.getBidder(currentCaseId)
      .then((result) => {
        setBridder(result["data"]);
        console.log(result["data"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentCaseId]);

  // * Socket.io 連線
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [currentUserID]);

  const handleChat = (item) => {
    console.log(item);

    Chat.sendMessage(currentUserID, item.userID, "hi", null)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });

    if (socket === null) return;
    socket.emit("sendMessage", {
      senderId: currentUserID,
      receiverId: item.userID,
      text: "hi",
    });

    navigate("/ChatRoom", setChatChatUser(item));
  };

  const handleDrictCaseView = (caseID) => {
    setCurrentCaseId(caseID);
    navigate(`/caseview/${caseID}`);
  };
  return (
    <div className="recommend">
      <div className="recommend-tile">
        <h1 style={{ fontWeight: 800 }}>
          {userEqual ? "報價人員" : "為您推薦案子"}
        </h1>
      </div>
      <div className="recommend-content">
        {/* 三元表達式 假如【userEqual】為【True】就執行【:】前面，反之【userEqual】為【False】就執行【:】後面 */}
        {userEqual ? (
          // 以案主身分查看自己的提案 => 報價人員
          <>
            {bridder.length === 0 ? (
              <h1 className="d-flex justify-content-center ">尚未有人報價</h1>
            ) : (
              bridder.map((item, index) => (
                <div className="recommend-content-box" key={index}>
                  <div>
                    <div>{item.userName}</div>
                    <p>報價金額 : {item.quotation}</p>
                    <p>自我推薦 : </p>
                    <p className="selfRecommended">{item.selfRecommended}</p>
                  </div>
                  {/* 三個btn Link */}
                  <div>
                    <button className="recommend-content-box-btn">
                      {/* <Link to={`/chatRoom/${item.userID}`} >聊聊</Link> */}
                      <div onClick={() => handleChat(item)}>聊聊</div>
                    </button>
                    <button className="recommend-content-box-btn">
                      <Link to={`/checkInfo/${item.userID}`}>查看資訊</Link>
                    </button>
                    <button className="recommend-content-box-btn">
                      <Link to={`/scheme/${item.userID}`}>合作</Link>
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          // 以接案者身分查看案件 => 推薦案件
          <>
            {recommendCases ? (
              recommendCases.map((item) => (
                <div
                  className="recommend-content-box"
                  key={item["caseID"]}
                  onClick={() => handleDrictCaseView(item["caseID"])}
                >
                  <div>案件標題： {item.caseName}</div>
                  <div>
                    地點：
                    {item.city}
                    {item.district}
                  </div>
                  <div>預計完成金額： {item.budget}元</div>
                  <div>預計完成時間：{item.deadline}</div>
                </div>
              ))
            ) : (
              <h1 className="d-flex justify-content-center ">無相關案件</h1>
            )}
          </>
        )}
        {/* 渲染 recommendCases 內的案件，要使用<Link> */}
      </div>
    </div>
  );
}

export default CaseRecommend;
