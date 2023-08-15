import React, { useEffect, useState, useContext } from "react";
import "./publishing.css";
import Auth from "../../axios/Auth";
import { useNavigate } from "react-router-dom";
import { GlobelDate } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Publishing(props) {
  const navigate = useNavigate();
  const { setCurrentCaseId } = useContext(GlobelDate);
  const { currentProposalCases } = props;
  const [cancelA, setCancelA] = useState("");
  const [cancel, setCancel] = useState(0);
  const handleCancel = async (caseID) => {
    await Auth.cancelCase(caseID)
      .then((result) => {
        console.log(result["data"][0]["result"]);
        setCancelA(result["data"][0]["result"]);
        toast.info(result["data"][0]["result"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // alert(result["data"][0]["result"]);
        setCancel(cancel + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, [cancelA]);
  return (
    <div>
      <ToastContainer limit={1} />
      {/* 利用陣列渲染 */}
      {currentProposalCases.length !== 0 ? (
        currentProposalCases.map((item) => (
          <div
            className="recordDiv3"
            style={{
              cursor: "pointer",
              marginLeft: "3rem",
              marginRight: "3rem",
              width: "auto",
            }}
            key={item.caseID}
            onClick={() => {
              setCurrentCaseId(item.caseID);
              navigate(`/caseview/${item.caseID}`);
            }}
          >
            <div className="d-flex align-items-center" key={item.caseID}>
              <span className="span1 flex-grow-1">案件名稱</span>
              <span className="span1 flex-grow-1">預算金額</span>
              <span className="span1 flex-grow-1">報價數</span>
              <span className="span1 flex-grow-1 del1">操作</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="span2 flex-grow-1">{item["caseName"]}</span>
              <span className="span2 flex-grow-1">{item["budget"]}</span>
              <span className="span2 flex-grow-1">
                {item["bidders_count"] === null ? 0 : item["bidders_count"]} / 5
              </span>
              <span className="span2 flex-grow-1 del1">
                <div
                  className="del2"
                  onClick={() => {
                    handleCancel(item.caseID);
                  }}
                >
                  下架
                </div>
              </span>
            </div>
          </div>
        ))
      ) : (
        <h1 className="noData">尚未刊登案件</h1>
      )}
    </div>
  );
}

export default Publishing;
