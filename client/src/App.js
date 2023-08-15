import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Proposal from "./pages/Proposal";
import AllCase from "./pages/AllCase";
import CaseView from "./pages/CaseView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PersonalInfo from "./pages/PersonalInfo";
import React, { useCallback, useEffect, useState } from "react";
import ChatRoom from "./pages/ChatRoom";
import Scheme from "./pages/Scheme";
import CheckInfo from "./pages/CheckInfo";
import Auth from "./axios/Auth";
import Ecpay from "./pages/Ecpay";
import Backstage from "./pages/Backstage";
import Chat from "./axios/Chat";
import unreadNotificationFunc from "./components/chatRoom_component/notification/unreadNotificationFunc";
import GetEcpayResult from "./pages/GetEcpayResult";
import Forgetpwd from "./pages/Forgetpwd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

localStorage.setItem("text", "hello");

// create useContext => 使跨組件的資料可以傳遞
export const GlobelDate = React.createContext({});

function App() {
  const navigate = useNavigate();
  // chat --- start
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const currentUserID = JSON.parse(localStorage.getItem("userID"));
  const unreadNotifications = unreadNotificationFunc(notifications);
  const [chatChatUser, setChatChatUser] = useState([]);

  useEffect(() => {
    Chat.getChatOtherUser(currentUserID)
      .then((res) => {
        setAllUsers(res["data"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUserID]);

  // chat --- end

  // 給註冊登入使用
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userHashPassword, setUserHashPassword] = useState("");

  //個人資料
  const [changeheadphoto, setChangeHeadPhoto] = useState({});

  const [infoData, setInfoData] = useState("1");

  const [proposal, setProposal] = useState("1");

  const [takethecase, setTakethecase] = useState("1");

  const [headphoto, setHeadPhoto] = useState("");
  const [name, setName] = useState("");
  const [usernumber, setUserNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [tools, setTools] = useState("");
  const [autobiography, setAutobiography] = useState("");

  //登入後的userID
  const [userID, setUserID] = useState("");

  // 當前被點擊的案件ID => 【allCase】取得，【caseView】需要
  const [currentCaseId, setCurrentCaseId] = useState("");

  //裡面要存Storage的Key=userInfo
  const [userinfo, setUserInfo] = useState("");

  // 存取綠界返回的原始碼 => 【UserInfo】 取得 ，【Ecpay】渲染
  const [ecpayHtml, setEcpayHtml] = useState("");
  //後台
  const [AllCase1, setAllCase1] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Add this state

  useEffect(() => {
    //進入前，先比對token
    Auth.checkToken(
      localStorage.getItem("userInfo"),
      localStorage.getItem("userID")
    )
      .then((result) => {
        console.log(result);
        if (result["data"] === "請重新登入") {
          //登出後把storage的userinfo改成result
          localStorage.setItem("userInfo", JSON.stringify(""));
          //把空字串傳入setUserInfo
          setUserInfo(JSON.parse(localStorage.getItem("")));
          toast.info('請重新登入', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // alert("請重新登入");
          navigate("/");
        } else if (result["data"] === "未登入") {
          localStorage.setItem("userInfo", JSON.stringify(""));
          //把空字串傳入setUserInfo
          setUserInfo(JSON.parse(localStorage.getItem("")));
          toast.info('請重新登入', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // alert("請重新登入");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    if (localStorage.getItem("userInfo")) {
      Auth.enterProfile(
        localStorage
          .getItem("userInfo")
          .substring(1, localStorage.getItem("userInfo").length - 1)
      )
        .then((result) => {
          setName(result["data"]["message"][0]["userName"]);
          setUserNumber(result["data"]["message"][0]["email"]);
          setPhone(result["data"]["message"][0]["phone"]);
          setExperience(result["data"]["message"][0]["education"]);
          setPortfolio(result["data"]["message"][0]["portfolio"]);
          setTools(result["data"]["message"][0]["softwore"]);
          setAutobiography(result["data"]["message"][0]["selfIntroduction"]);
          setHeadPhoto(
            `data:image/jpeg;base64, ${result["data"]["message"][0]["profilePhoto"]}`
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <>
      {/* 提供 GlobelDate 內的所有資料給被包含的所有組件 */}
      <GlobelDate.Provider
        value={{
          totalPages,
          setTotalPages,
          AllCase1,
          setAllCase1,
          usernumber,
          setUserNumber,
          phone,
          setPhone,
          experience,
          setExperience,
          portfolio,
          setPortfolio,
          tools,
          setTools,
          autobiography,
          setAutobiography,
          headphoto,
          setHeadPhoto,
          name,
          setName,
          infoData, //我的帳戶目前位置
          setInfoData,
          proposal, //提案紀錄目前位置
          setProposal,
          takethecase, //接案紀錄目前位置
          setTakethecase,
          setUserName,
          setUserEmail,
          setUserPassword,
          setUserHashPassword,
          userName,
          userEmail,
          userPassword,
          userHashPassword,
          changeheadphoto,
          setChangeHeadPhoto,
          userinfo,
          setUserInfo,
          userID,
          setUserID,
          currentCaseId,
          setCurrentCaseId,
          ecpayHtml,
          setEcpayHtml,
          notifications,
          setNotifications,
          unreadNotifications,
          chatChatUser,
          setChatChatUser,
        }}
      >
        <Header />
        <ToastContainer limit={1} />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/PersonalInfo"} element={<PersonalInfo />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/proposal"} element={<Proposal />} />
          <Route path={"/allCase"} element={<AllCase />} />
          <Route path={"/CaseView/:caseID"} element={<CaseView />} />
          <Route path={"/chatRoom"} element={<ChatRoom />} />
          <Route path={"/Scheme/:bidderID"} element={<Scheme />} />
          <Route path={"/checkInfo/:userID"} element={<CheckInfo />} />
          <Route path={"/Ecpay"} element={<Ecpay />} />
          <Route path={"/GetEcpayResult"} element={<GetEcpayResult />} />
          <Route path={"/ChatRoom"} element={<ChatRoom />} />
          <Route path={"/Backstage"} element={<Backstage />} />
          <Route path={"/Forgetpwd"} element={<Forgetpwd />} />
        </Routes>

        <Footer />
      </GlobelDate.Provider>
    </>
  );
}

export default App;
