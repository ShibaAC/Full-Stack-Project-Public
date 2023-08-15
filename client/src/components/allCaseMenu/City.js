import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import React, { useState } from "react";
function City(props) {
  const {
    bigCityNames,
    setSubCityStr,
    subCityStr,
    setSubCityID,
    subCityID,
    bigCityStr,
    setBigCityStr,
    bigCityID,
    setBigCityID,
    subCityNames,
  } = props;

  const [current, setCurrent] = useState("1");

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  // 處理母地區的字串
  const handlebigCity = (id) => {
    setBigCityID(id);
    if (bigCityStr.indexOf(id) === -1) {
      // 進到頁面是否為第一次做篩選，為了避免,號
      if (bigCityStr === "null" || bigCityStr === "") {
        setBigCityStr(bigCityStr.replace("null", `${id}`)); // 將初始的null替換掉
      } else {
        setBigCityStr((preState) => preState + "," + id);
      }
    }
    // 假如重複點選判斷狀態
    if (bigCityStr.match(id)) {
      if (bigCityStr.indexOf(`${id},`) !== -1) {
        setBigCityStr(bigCityStr.replace(`${id},`, "")); // 處理【A01,】這種狀態
      } else if (bigCityStr.indexOf(`,${id}`) !== -1) {
        setBigCityStr(bigCityStr.replace(`,${id}`, "")); // 處理【,A01】這種狀態
      } else {
        setBigCityStr("null"); // 處理【A01】這種狀態=> 這會報錯
      }
    }
  };

  // 處理子地區的字串
  const handleSubCity = (e) => {
    if (
      e.domEvent.nativeEvent.target.offsetParent.style.getPropertyValue(
        "background-color"
      ) === "goldenrod"
    ) {
      e.domEvent.nativeEvent.target.offsetParent.style.setProperty(
        "background-color",
        "gray"
      );
      e.domEvent.nativeEvent.target.offsetParent.style.setProperty(
        "color",
        "black"
      );
    } else {
      e.domEvent.nativeEvent.target.offsetParent.style.setProperty(
        "background-color",
        "goldenrod"
      );
      e.domEvent.nativeEvent.target.offsetParent.style.setProperty(
        "color",
        "black"
      );
    }
    // console.log(e.domEvent.nativeEvent.target.offsetParent); //* 父節點
    // console.log("click ", e);
    setCurrent(e.key); // 取得代號
    setSubCityID(e.key);
    if (subCityStr.indexOf(e.key) === -1) {
      // 進到頁面是否為第一次做篩選，為了避免,號
      if (subCityStr === "null" || subCityStr === "") {
        setSubCityStr(subCityStr.replace("null", `${e.key}`)); // 將初始的null替換掉
      } else {
        setSubCityStr((preState) => preState + "," + e.key);
      }
    }
    // 假如重複點選判斷狀態
    if (subCityStr.match(e.key)) {
      if (subCityStr.indexOf(`${e.key},`) !== -1) {
        setSubCityStr(subCityStr.replace(`${e.key},`, "")); // 處理【A01,】這種狀態
      } else if (subCityStr.indexOf(`,${e.key}`) !== -1) {
        setSubCityStr(subCityStr.replace(`,${e.key}`, "")); // 處理【,A01】這種狀態
      } else {
        setSubCityStr("null"); // 處理【A01】這種狀態=> 這會報錯
      }
    }
  };

  const items = [
    getItem(
      "地區",
      "location",
      <AppstoreOutlined />,
      bigCityNames.map((items) =>
        getItem(
          items["city"],
          items["cityID"],
          null,
          subCityNames.map(
            (item) =>
              items["cityID"] === item["cityID"] &&
              getItem(item["district"], item["districtID"])
          )
        )
      )
    ),
  ];

  return (
    <div className="mb-3 category">
      <Menu
        onClick={handleSubCity}
        style={{
          width: 170,
          background: "#6c757d",
          color: "#fff",
          border: "1px solid #6c757d",
          borderRadius: "10px",
        }}
        // defaultOpenKeys={["location"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </div>
  );
}

export default City;
