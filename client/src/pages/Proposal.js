import React, { useState, useContext, useEffect } from "react";
import "./proposal.css";
import { GlobelDate } from "../App";
import Case from "../axios/Case";
import { useLocation, useNavigate } from "react-router-dom";
//* ant UI elements => npm install antd @ant-design/icons
import { DatePicker, Space, Input, Button, Form, InputNumber } from "antd"; //* 引入 antd UI
import { CheckOutlined, FileAddOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { TextArea } = Input;

function Proposal() {
  const navigate = useNavigate();
  const location = useLocation(); // get case data from ProposalRecord

  // 選擇全域變數
  const {} = useContext(GlobelDate);
  // 儲存選擇的母、子類別
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  // 儲存選擇地區的母、子類別
  const [city, setCity] = useState();
  const [subCity, setSubCity] = useState();

  // 母類別
  const bigClassNames = JSON.parse(localStorage.getItem("bigClassNames"));
  // 子類別
  const subBigClassNames = JSON.parse(localStorage.getItem("subBigClassNames"));
  // 母地區
  const bigCityNames = JSON.parse(localStorage.getItem("bigCityNames"));
  // 子地區
  const subCityNames = JSON.parse(localStorage.getItem("subCityNames"));

  // case information
  const [caseID, setCaseID] = useState(
    location.state ? location.state["caseID"] : 0
  ); // 案件ID
  const [name, setName] = useState(
    location.state ? location.state["caseInfo"][0]["caseName"] : ""
  ); // 案件名稱
  const [budget, setBudget] = useState(
    location.state ? location.state["caseInfo"][0]["budget"] : ""
  ); // 案件預計金額
  const [deadline, setDeadline] = useState(
    location.state ? location.state["caseInfo"][0]["deadline"] : null
  ); // 案件預計完成時間
  const [description, setDescription] = useState(
    location.state ? location.state["caseInfo"][0]["description"] : ""
  ); // 案件描述
  const [contactName, setContactName] = useState(
    location.state ? location.state["caseInfo"][0]["contactName"] : ""
  ); // 聯絡人姓名
  const [isContactPhone, setIsContactPhone] = useState(
    location.state ? location.state["caseInfo"][0]["contactAble"] : null
  ); // 是否可以聯絡
  const [contactPhone, setContactPhone] = useState(
    location.state ? location.state["caseInfo"][0]["contactPhone"] : ""
  ); // 聯絡的電話
  // 儲存可連絡時間
  const [contactTime, setContactTime] = useState("0000");
  const [contactTimeItem0, setContactTimeItem0] = useState(
    location.state ? location.state["caseInfo"][0]["contactTime"][0] : "0"
  );
  const [contactTimeItem1, setContactTimeItem1] = useState(
    location.state ? location.state["caseInfo"][0]["contactTime"][1] : "0"
  );
  const [contactTimeItem2, setContactTimeItem2] = useState(
    location.state ? location.state["caseInfo"][0]["contactTime"][2] : "0"
  );
  const [contactTimeItem3, setContactTimeItem3] = useState(
    location.state ? location.state["caseInfo"][0]["contactTime"][3] : "0"
  );
  // 所有檔案
  const [allFiles, setAllFiles] = useState(null);
  const [overFile, setOverFile] = useState(true); // 防止超過五張還按送出

  // 處理【聯絡時間】的boolean
  const handlecontactTime = (event) => {
    // setContactTime(event.target.checked)
    const isChecked = (bool) => {
      if (bool) {
        return "1";
      } else {
        return "0";
      }
    };
    if (event.target.id === "time0") {
      // 取得當前是否 checked，並儲存至相對應的 Item 供其他狀態判斷
      setContactTimeItem0(isChecked(event.target.checked));
      // 儲存四個input狀態
      setContactTime(
        `${isChecked(
          event.target.checked
        )}${contactTimeItem1}${contactTimeItem2}${contactTimeItem3}`
      );
    } else if (event.target.id === "time1") {
      setContactTimeItem1(isChecked(event.target.checked));
      setContactTime(
        `${contactTimeItem0}${isChecked(
          event.target.checked
        )}${contactTimeItem2}${contactTimeItem3}`
      );
    } else if (event.target.id === "time2") {
      setContactTimeItem2(isChecked(event.target.checked));
      setContactTime(
        `${contactTimeItem0}${contactTimeItem1}${isChecked(
          event.target.checked
        )}${contactTimeItem3}`
      );
    } else {
      setContactTimeItem3(isChecked(event.target.checked));
      setContactTime(
        `${contactTimeItem0}${contactTimeItem1}${contactTimeItem2}${isChecked(
          event.target.checked
        )}`
      );
    }
  };

  // 典擊指定日期才會出現日期選擇
  const showTime = (boolean) => {
    if (boolean === true) {
      document
        .getElementById("setTime")
        .style.setProperty("visibility", "visible");
    }
  };

  const onChange = (date, dateString) => {
    // console.log("date");
    // console.log(date);
    // console.log("dateString");
    // console.log(dateString);
    setDeadline(dateString);
  };
  // 判別【聯絡時間】的boolean

  //  取得當前母類別資料
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
  };
  //  取得當前子類別資料
  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
    console.log(event.target.value);
  };
  //  取得當前母類別資料
  const handleCityChange = (event) => {
    setCity(event.target.value);
    console.log(event.target.value);
  };
  //  取得當前子類別資料
  const handleSubCityChange = (event) => {
    setSubCity(event.target.value);
    console.log(event.target.value);
  };

  // 處理 => 發布案件
  const handlePublishCase = () => {
    // check user write form
    if (!name) {
      toast.warning("請填寫姓名", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   alert("Please write your name.");
      return;
    } else if (!category) {
      toast.warning("請選擇案件類別", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   alert("Please choose case category.");
      return;
    } else if (!subCategory) {
      toast.warning("請選擇案件類別", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   alert("Please choose case subCategory.");
      return;
    } else if (!city) {
      toast.warning("請選擇工作地點", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   alert("Please choose case city.");
      return;
    } else if (!subCity) {
      toast.warning("請選擇工作地點", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   alert("Please choose case subCity.");
      return;
    } else if (!budget) {
      toast.warning("請填寫預算金額", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   alert("Please write case budget.");
      return;
    } else if (!contactName) {
      toast.warning("請填寫聯絡資料", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   alert("Please write your contactName.");
      return;
    }
    let status = "刊登中";
    // 取得當前 userID
    let userID = JSON.parse(localStorage.getItem("userID"));
    // 將資料傳遞給後端
    Case.addCase(
      caseID,
      userID,
      name,
      category,
      subCategory,
      budget,
      deadline,
      city,
      subCity,
      description,
      contactName,
      isContactPhone,
      contactPhone,
      contactTime,
      status,
      allFiles
    )
      .then((result) => {
        console.log(result);
        // alert("刊登成功");
        toast.success("刊登成功", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/personalinfo");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 處理 => 儲存至草稿
  const handleDraftCase = () => {
    let status = "草稿";
    let userID = JSON.parse(localStorage.getItem("userID"));
    Case.addCase(
      caseID,
      userID,
      name,
      category,
      subCategory,
      budget,
      deadline,
      city,
      subCity,
      description,
      contactName,
      isContactPhone,
      contactPhone,
      contactTime,
      status,
      allFiles
    )
      .then((result) => {
        console.log(result);
        toast.success("新增至草稿", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // alert("已新增草稿");
        navigate("/personalinfo");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo")) !== "") {
      // 初始狀態是隱藏
      document
        .getElementById("setTime")
        .style.setProperty("visibility", "hidden");
    }
  }, []);
  return (
    <main className="container">
      {/* 未登入導向至登入介面 */}
      {JSON.parse(localStorage.getItem("userInfo")) === "" ? (
        <h1 className="noLogin">尚未登入</h1>
      ) : (
        <div className="caseBox">
          {/* 案件名稱 */}
          <div className="box">
            {/* <h4 className="">案件名稱 :</h4>
            <input
              type="text"
              placeholder="請填寫案件名稱"
              onChange={(event) => setName(event.target.value)}
              value={name}
            /> */}
          </div>
          <div className="box">
            <Form.Item
              label="案件名稱"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                onChange={(event) => {
                  setName(event.target.value);
                  console.log(event.target.value);
                }}
              />
            </Form.Item>
          </div>
          {/* 類別需求 */}
          <div className="box">
            <Form.Item
              label="需求類別："
              name="category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ width: "200px" }}
                  // value={category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option selected disabled>
                    請選擇....
                  </option>
                  {bigClassNames.map((item) => (
                    <option key={item["bigClassID"]} value={item["bigClassID"]}>
                      {item["bigClassName"]}
                    </option>
                  ))}
                </select>
                <br />
                {/* 依不同的母類別找尋相對應的子類別 */}
                {category && (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ width: "200p;x" }}
                    onChange={handleSubCategoryChange}
                    required
                  >
                    <option selected disabled>
                      請選擇...
                    </option>
                    {subBigClassNames.map((item) => (
                      <>
                        {item["bigClassID"] === category && (
                          <option key={item["classID"]} value={item["classID"]}>
                            {item["className"]}
                          </option>
                        )}
                      </>
                    ))}
                  </select>
                )}
              </>
            </Form.Item>
          </div>
          {/* 金額 */}
          <div className="box">
            <Form.Item
              label="預算金額"
              name="money"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="請輸入預期的金額，最低200元"
                min={200}
                // max={10000}
                type="number"
                pattern="\d+"
                onChange={(event) => {
                  setBudget(event.target.value);
                }}
              />
            </Form.Item>
          </div>
          {/* 期限 */}
          <div className="box">
            {/* <h4 htmlFor="caseMoney">期限 :</h4> */}
            <Form.Item
              label="期限"
              name="deadline"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <>
                <input
                  type="radio"
                  id="noTime"
                  name="deadline"
                  onClick={() => {
                    setDeadline(null);
                    showTime(false);
                  }}
                />
                <label htmlFor="noTime">不指定日期</label>
                <br />
                <input
                  type="radio"
                  name="deadline"
                  id="yesTime"
                  onClick={(e) => showTime(true)}
                />
                <label htmlFor="yesTime">指定日期 </label>
                <Space id="setTime" direction="vertical">
                  <DatePicker onChange={onChange} id="setTime" />
                </Space>
              </>
            </Form.Item>
          </div>
          {/* 地點 */}
          <div className="box">
            <Form.Item
              label="工作地點"
              name="money"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ width: "200px" }}
                  onChange={handleCityChange}
                  required
                >
                  <option selected disabled>
                    請選擇....
                  </option>
                  {bigCityNames.map((item) => (
                    <option key={item["cityID"]} value={item["cityID"]}>
                      {item["city"]}
                    </option>
                  ))}
                </select>
                <br />
                {/* 依不同的母類別找尋相對應的子類別 */}
                {city && (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ width: "200px" }}
                    onChange={handleSubCityChange}
                    required
                  >
                    <option selected disabled>
                      請選擇...
                    </option>
                    {subCityNames.map((item) => (
                      <>
                        {item["cityID"] === city && (
                          <option
                            key={item["districtID"]}
                            value={item["districtID"]}
                          >
                            {item["district"]}
                          </option>
                        )}
                      </>
                    ))}
                  </select>
                )}
              </>
            </Form.Item>
          </div>
          {/* 內容 */}
          <div className="box">
            <h4>工作內容 :</h4>
            <TextArea
              showCount
              maxLength={100}
              style={{ height: "150px" }}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          {/* 檔案 */}
          <div className="box">
            <h4>是否需上傳照片或檔案供接案人參考</h4>
            <p>
              1. 最多可新增5個附件，每個大小不超過
              <span className="text-danger fw-bolder">2MB</span> 。
            </p>
            <p>
              2. 因案件上架後為公開頁面， 故
              <span className="text-danger fw-bolder">請勿</span>
              上傳內含個資圖片(如：個人名片或或其他聯絡方式)。
            </p>
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/jpeg, image/png, application/pdf"
              onChange={(e) => {
                if (e.target.files.length < 5) {
                  setOverFile(true);
                  setAllFiles(e.target.files);
                } else {
                  setOverFile(false);
                  setAllFiles(e.target.files);
                  return toast.warning("最多只能選擇5個檔案，請重新選取", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
            />
          </div>
          {/* 聯絡方式 */}
          <div className="box">
            <Form.Item
              label="聯絡資料"
              name="info"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input
                type="text"
                placeholder="請輸入聯絡人名稱"
                onChange={(event) => setContactName(event.target.value)}
                value={contactName}
                pattern="[^0-9]+" // 限制不可有數字，可以下底線
              />
            </Form.Item>
            <Form.Item
              label="允許接案人透過電話聯絡您嗎"
              name="info"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(event) => {
                    setIsContactPhone(event.target.value);
                    console.log(event.target.value);
                  }}
                  value={isContactPhone}
                >
                  <option selected disabled>
                    請選擇...
                  </option>
                  <option value="1">允許</option>
                  <option value="0">不允許</option>
                </select>
                {isContactPhone !== null && isContactPhone === "1" && (
                  <>
                    <h4 className="my-3">連絡人電話號碼</h4>
                    <input
                      type="text"
                      placeholder="請輸入連絡人電話號碼"
                      onChange={(event) => setContactPhone(event.target.value)}
                      value={contactPhone}
                      pattern="\d+"
                    />
                    <h4 className="my-3">請勾選希望接案人聯絡時段?</h4>
                    <input
                      type="checkbox"
                      id="time0"
                      name="time"
                      onClick={handlecontactTime}
                    />
                    <label htmlFor="time0">上午00:00~上午08:00</label>
                    <br />
                    <input
                      type="checkbox"
                      id="time1"
                      name="time"
                      onClick={handlecontactTime}
                    />
                    <label htmlFor="time1">上午08:00~中午12:00</label>
                    <br />
                    <input
                      type="checkbox"
                      id="time2"
                      name="time"
                      onClick={handlecontactTime}
                    />
                    <label htmlFor="time2">下午13:00~下午17:00</label>
                    <br />
                    <input
                      type="checkbox"
                      id="time3"
                      name="time"
                      onClick={handlecontactTime}
                    />
                    <label htmlFor="time3">晚上17:00~晚上24:00</label>
                  </>
                )}
              </>
            </Form.Item>
          </div>
          {/* btn */}
          <div className="box d-flex justify-content-evenly">
            <div id="proposal-DraftCase-btn">
              <FileAddOutlined />
              <button
                type="button"
                onClick={handleDraftCase}
                disabled={!overFile} // 預防檔案超過
              >
                儲存至草稿
              </button>
            </div>
            <div id="proposal-case-btn">
              <CheckOutlined />
              <button
                type="button"
                onClick={handlePublishCase}
                disabled={!overFile} // 預防檔案超過
              >
                發布案件
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer limit={1} /> */}
    </main>
  );
}

export default Proposal;
