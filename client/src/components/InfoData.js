import React, { useContext, useEffect, useState } from "react";
import "./infodata.css";
import { GlobelDate } from "../App";
import Auth from "../axios/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import presetHeadPhoto from "../imgs/head.png";

function InfoData() {
  //修改姓名用
  const [changename, setChangeName] = useState(false);
  //修改密碼用
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [newpassword2, setNewPassword2] = useState("");
  //修改電話用
  const [changephone, setChangePhone] = useState("");
  //修改學經歷
  const [changeexperience, setChangeExperience] = useState("");
  //修改作品集
  const [changeportfolio, setChangePortfolio] = useState();
  const [portfolioMessange, setPortfolioMessange] = useState("");
  const [fileName, setFileName] = useState("");
  const [overFile, setOverFile] = useState();
  // 顯示圖片檔或PDF
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  //修改擅長工具
  const [changeskills, setChangeSkills] = useState("");
  //修改自傳
  const [changeSelfIntroduction, setChangeSelfIntroduction] = useState("");
  const {
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
    userID,
    userinfo,
    setUserInfo,
    changeheadphoto,
    setChangeHeadPhoto,
  } = useContext(GlobelDate);
  const data = new FormData();
  data.append("photo", changeheadphoto);
  data.append("userID", JSON.parse(localStorage.getItem("userID")));

  const photoData = new FormData();
  const reader = new FileReader();
  //進入我的帳戶就抓資料
  useEffect(() => {
    setUserInfo(
      localStorage
        .getItem("userInfo")
        .substring(1, localStorage.getItem("userInfo").length - 1)
    );
    Auth.enterProfile(userinfo)
      .then((result) => {
        console.log(result);
        setName(result["data"]["message"][0]["userName"]);
        setUserNumber(result["data"]["message"][0]["email"]);
        setPhone(result["data"]["message"][0]["phone"]);
        setExperience(result["data"]["message"][0]["education"]);
        setPortfolio(result["data"]["message"][0]["portfolio"]);
        setFileName(result["data"]["filesNameArray"]);
        setTools(result["data"]["message"][0]["softwore"]);
        setAutobiography(result["data"]["message"][0]["selfIntroduction"]);
        setHeadPhoto(
          `data:${fileType(
            result["data"]["message"][0]["profilePhoto"]
          )};base64, ${result["data"]["message"][0]["profilePhoto"]}`
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //修改密碼
  const handleOldPassword = (e) => {
    Auth.checkOldPassword(
      JSON.parse(localStorage.getItem("userID")),
      newpassword,
      oldpassword
    )
      .then((result) => {
        toast.info(result["data"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        //window.alert(result["data"]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //修改頭貼
  const handleHeadPhoto = () => {
    // console.log(userID);
    // console.log(data.get("photo"));
    Auth.uploadPhoto(data.get("photo"), data.get("userID"))
      .then((result) => {
        setHeadPhoto(
          `data:image/jpeg;base64, ${result["data"]["profilePhoto"]}`
        );
        // console.log(result);
        // photoData.append("updatePhoto", result["data"]);
        // console.log(photoData.get("updatePhoto"));
      })
      .catch((err) => {
        console.error(err);
      });

    // reader.readAsDataURL(photoData.get("updatePhoto"));
  };

  //修改姓名
  const handleChangeName = () => {
    Auth.updateUser(JSON.parse(localStorage.getItem("userID")), changename)
      .then((result) => {
        toast.info(result["data"]["result"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // window.alert(result["data"]["result"]);
        Auth.enterProfile(userinfo).then((result) => {
          setName(result["data"]["message"][0]["userName"]);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //修改電話
  const handleChangePhone = () => {
    Auth.updatePhone(JSON.parse(localStorage.getItem("userID")), changephone)
      .then((result) => {
        // console.log(result);
        setPhone(result["data"]["phone"]);
        toast.info(result["data"]["result"][0]["result"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // window.alert(result["data"]["result"][0]["result"]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //修改學經歷
  const handleChangeExperience = () => {
    Auth.updateExperience(
      JSON.parse(localStorage.getItem("userID")),
      changeexperience
    )
      .then((result) => {
        toast.info(result["data"]["result"][0]["result"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        //window.alert(result["data"]["result"][0]["result"]);
        setExperience(result["data"]["experience"]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //修改作品集
  const handleChangePortfolio = () => {
    // console.log(changeportfolio);
    Auth.updatePortfolio(
      JSON.parse(localStorage.getItem("userID")),
      changeportfolio
    )
      .then((result) => {
        // console.log(result);
        setPortfolio(result["data"]["files"]);
        // console.log(portfolio);

        setPortfolioMessange(
          toast.info(result["data"]["result"], {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
        setFileName(result["data"]["fileName"]);
        portfolioMessange();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fileType = (file) => {
    if (file.charAt(0) === "/") {
      return "image/jpeg";
    } else if (file.charAt(0) === "i") {
      return "image/png";
    } else if (file.charAt(0) === "J") {
      return "application/pdf";
    } else if (file.charAt(0) === "U") {
      return "application/pdf";
    } else if (file.charAt(0) === "R") {
      return "image/gif";
    }
  };

  // 顯示作品集
  const handleFileClick = (fileUrl) => {
    console.log("handleFileClick called with fileUrl:", fileUrl);

    if (fileType(fileUrl) === "application/pdf") {
      window.open(fileUrl, "_blank");
    } else {
      setModalContent(<img src={fileUrl} alt="作品集" />);
      setShowModal(true);
    }
  };

  //修改擅長工具
  const handleChangeSkills = () => {
    Auth.updateSkills(JSON.parse(localStorage.getItem("userID")), changeskills)
      .then((result) => {
        // console.log(result);
        setTools(result["data"]["skills"]);
        // console.log(tools);
        toast.info("更新成功！", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // window.alert("更新成功！");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //修改自傳
  const handleChangeSelfIntroduction = () => {
    Auth.updateSelfIntroduction(
      JSON.parse(localStorage.getItem("userID")),
      changeSelfIntroduction
    )
      .then((result) => {
        setAutobiography(result["data"]["SelfIntroduction"]);
        toast.info("更新成功！", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // window.alert("更新成功！");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="infoDataDiv d-flex infoData">
      <span className="headPhotoDiv">
        <img
          id="infoImg"
          style={{ objectFit: "cover" }}
          src={
            headphoto.charAt(23) === "R" ||
            headphoto.charAt(23) === "i" ||
            headphoto.charAt(23) === "/" ||
            headphoto.charAt(24) === "R" ||
            headphoto.charAt(24) === "i" ||
            headphoto.charAt(24) === "/"
              ? headphoto
              : presetHeadPhoto
          }
        />
        <svg
          type="button"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square color1"
          viewBox="0 0 16 16"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <span className="spanCenter">修改頭像</span>
                <button
                  type="button"
                  className="btn-close mx-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="avatar">請選擇一張頭像：</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg, image/jpg, image/gif"
                  className="inputFile"
                  onChange={(e) => {
                    setChangeHeadPhoto(e.target.files[0]);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleHeadPhoto}
                >
                  上傳
                </button>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </span>
      <div className="infoDataDiv2">
        <div>
          <span className="p1">{name}</span>
          <button data-bs-toggle="modal" data-bs-target="#changeName">
            修改
          </button>
          <div
            className="modal fade"
            id="changeName"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="spanCenter">修改姓名</span>
                  <button
                    type="button"
                    className="btn-close mx-0"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="avatar">請輸入姓名：</label>
                  <input
                    type="text"
                    id="avatar"
                    name="avatar"
                    className="inputText"
                    onChange={(e) => {
                      setChangeName(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                    disabled={!changename}
                    onClick={handleChangeName}
                  >
                    修改
                  </button>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="infoDiv">
          <div className="infoDiv1">
            <label htmlFor="" className="p2">
              帳號：
            </label>
            <span>{usernumber}</span>
          </div>
          <hr />
          <div className="infoDiv1">
            <label htmlFor="" className="p2">
              密碼：
            </label>
            <span>***************</span>
            <button
              className="float-right"
              data-bs-toggle="modal"
              data-bs-target="#changePassword"
            >
              修改
            </button>
            <div
              className="modal fade"
              id="changePassword"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <span className="spanCenter">修改密碼</span>
                    <button
                      type="button"
                      className="btn-close mx-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="my-3">
                      <label htmlFor="avatar1">請輸入舊密碼：</label>
                      <input
                        type="password"
                        id="avatar1"
                        name="avatar"
                        className="inputText"
                        required
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="avatar2">請輸入新密碼：</label>
                      <input
                        type="password"
                        id="avatar2"
                        name="avatar"
                        className="inputText"
                        required
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="my-3 d-inline">
                      <label htmlFor="avatar3">請再輸入密碼：</label>
                      <input
                        type="password"
                        id="avatar3"
                        name="avatar"
                        className="inputText"
                        required
                        onChange={(e) => {
                          setNewPassword2(e.target.value);
                        }}
                      />
                    </div>
                    {newpassword != newpassword2 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-circle-fill"
                        viewBox="0 0 16 16"
                        style={{ color: "red" }}
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block"
                      data-bs-dismiss="modal"
                      style={{ marginTop: "24px" }}
                      onClick={handleOldPassword}
                      disabled={
                        newpassword != newpassword2 ||
                        !oldpassword ||
                        !newpassword
                      }
                    >
                      修改
                    </button>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="infoDiv1">
            <label htmlFor="" className="p2">
              聯絡電話：
            </label>
            <span>{phone}</span>
            <button
              className="float-right"
              data-bs-toggle="modal"
              data-bs-target="#changephone"
            >
              修改
            </button>
            <div
              className="modal fade"
              id="changephone"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <span className="spanCenter">修改聯絡電話</span>
                    <button
                      type="button"
                      className="btn-close mx-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="my-3">
                      <label htmlFor="avatar1">請輸入聯絡電話：</label>
                      <input
                        type="tel"
                        id="avatar1"
                        name="avatar"
                        className="inputText"
                        required
                        onChange={(e) => {
                          setChangePhone(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block"
                      data-bs-dismiss="modal"
                      style={{ marginTop: "24px" }}
                      onClick={handleChangePhone}
                      disabled={!changephone}
                    >
                      修改
                    </button>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="infoDiv1">
            <label htmlFor="" className="p2">
              銀行帳戶：
            </label>
            <span>808-0015*********</span>
            <button
              className="float-right"
              data-bs-toggle="modal"
              data-bs-target="#changebank"
            >
              修改
            </button>
            <div
              className="modal fade"
              id="changebank"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <span className="spanCenter">修改銀行帳戶</span>
                    <button
                      type="button"
                      className="btn-close mx-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="my-3">
                      <label htmlFor="avatar1">請輸入銀行代碼與帳戶：</label>
                      <input
                        type="tel"
                        id="avatar1"
                        name="avatar"
                        className="inputText"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block"
                      data-bs-dismiss="modal"
                      style={{ marginTop: "24px" }}
                    >
                      修改
                    </button>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="CVDiv">
        <hr className="my-5" />
        <div className="CV1">
          <div>
            <div className="p3">我的履歷</div>
          </div>
          <div className="infoDiv2">
            <label htmlFor="" className="p2 flexGrow1">
              學、經歷
            </label>
            <span className="flexGrow2">{experience}</span>
            <button
              className="float-right flexGrow3"
              data-bs-toggle="modal"
              data-bs-target="#changeexperience"
            >
              修改
            </button>
            <div
              className="modal fade"
              id="changeexperience"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <span className="spanCenter">修改學經歷</span>
                    <button
                      type="button"
                      className="btn-close mx-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="my-3">
                      <label htmlFor="avatar1">請輸入學經歷：</label>
                      <input
                        type="text"
                        id="avatar1"
                        name="avatar"
                        className="inputText"
                        required
                        onChange={(e) => {
                          setChangeExperience(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block"
                      data-bs-dismiss="modal"
                      style={{ marginTop: "24px" }}
                      onClick={handleChangeExperience}
                    >
                      修改
                    </button>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="infoDiv2">
            <label htmlFor="" className="p2 flexGrow1">
              作品集
            </label>
            {/* <span className="portfolio flexGrow2">
              {portfolio.map((file, index) => (
                <a
                  href={`data:${fileType(file)};base64, ${file}`}
                  key={index}
                  download={fileName[index]}
                >
                  {fileName[index]}
                </a>
              ))}
            </span> */}
            <span className="portfolio flexGrow2">
              {portfolio.map((fileUrl, index) => (
                <div key={index}>
                  <a
                    key={index}
                    href={fileUrl} // 使用 S3 对象 URL 作为链接
                    target={
                      fileType(fileUrl) === "application/pdf" ? "_blank" : ""
                    }
                    // download={fileName[index]}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFileClick(fileUrl);
                    }}
                  >
                    {fileName[index]}
                  </a>
                </div>
              ))}
            </span>
            <button
              className="float-right flexGrow3"
              data-bs-toggle="modal"
              data-bs-target="#changeportfolio"
            >
              修改
            </button>
            <div
              className="modal fade"
              id="changeportfolio"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <span className="spanCenter">修改作品集</span>
                    <button
                      type="button"
                      className="btn-close mx-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="my-3">
                      <label htmlFor="avatar1">
                        請上傳作品集(圖片檔 or PDF檔)：
                      </label>
                      <input
                        type="file"
                        multiple
                        id="avatar1"
                        name="avatar"
                        className="inputText"
                        accept="image/jpeg, image/png, image/gif, application/pdf"
                        required
                        onChange={(e) => {
                          if (e.target.files.length > 5) {
                            setOverFile(false);

                            return toast.warning(
                              "最多只能選擇5個檔案，請重新選取",
                              {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              }
                            );
                          } else {
                            setOverFile(true);
                            setChangePortfolio(e.target.files);
                          }
                        }}
                      />
                      {/*  */}
                      {/*  */}
                      {showModal && (
                        <div
                          className="modal fade show"
                          tabIndex="-1"
                          style={{ display: "block" }}
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  onClick={() => {
                                    setShowModal(false);
                                    setModalContent(null);
                                  }}
                                ></button>
                              </div>
                              <div className="modal-body">{modalContent}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/*  */}
                      {/*  */}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block"
                      data-bs-dismiss="modal"
                      style={{ marginTop: "24px" }}
                      onClick={handleChangePortfolio}
                      disabled={!overFile}
                    >
                      修改
                    </button>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="infoDiv2">
            <label htmlFor="" className="p2 flexGrow1">
              擅長工具
            </label>
            <span className="flexGrow2">{tools}</span>
            <button
              className="float-right flexGrow3"
              data-bs-toggle="modal"
              data-bs-target="#changeSkills"
            >
              修改
            </button>
            <div
              className="modal fade"
              id="changeSkills"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <span className="spanCenter">修改擅長工具</span>
                    <button
                      type="button"
                      className="btn-close mx-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="my-3">
                      <label htmlFor="avatar1">請輸入擅長工具：</label>
                      <input
                        type="text"
                        id="avatar1"
                        name="avatar"
                        className="inputText"
                        defaultValue={tools}
                        required
                        onChange={(e) => {
                          setChangeSkills(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block"
                      data-bs-dismiss="modal"
                      style={{ marginTop: "24px" }}
                      onClick={handleChangeSkills}
                    >
                      修改
                    </button>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pos">
            <div className="p3 borderTop">自傳</div>
            <div>
              <p className="p5">{autobiography}</p>
            </div>
            <button
              className="float-right2"
              data-bs-toggle="modal"
              data-bs-target="#changeSelfIntroduction"
            >
              修改
            </button>
            <div
              className="modal fade"
              id="changeSelfIntroduction"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modalSize">
                <div className="modal-content">
                  <div className="modal-header">
                    <span className="spanCenter">修改自傳</span>
                    <button
                      type="button"
                      className="btn-close mx-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="my-3">
                      <label
                        htmlFor="avatar1"
                        style={{
                          display: "block",
                          textAlign: "center",
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          margin: "0",
                        }}
                      >
                        請輸入自傳
                      </label>
                      <textarea
                        id="avatar1"
                        name="avatar"
                        className="inputText2"
                        defaultValue={autobiography}
                        required
                        onChange={(e) => {
                          setChangeSelfIntroduction(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block"
                      data-bs-dismiss="modal"
                      style={{ marginTop: "24px" }}
                      onClick={handleChangeSelfIntroduction}
                    >
                      修改
                    </button>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}

export default InfoData;
