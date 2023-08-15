import React from "react";
import City from "./City";
import ClassNames from "./ClassNames";
import "./index.css";

function MenuIndex(props) {
  const {
    bigClassNames,
    subBigClassNames,
    bigCityNames,
    subCityNames,
    setBigClassID,
    bigClassID,
    setBigClassStr,
    bigClassStr,
    subClassID,
    setSubClassID,
    subClassStr,
    setSubClassStr,
    bigCityID,
    setBigCityID,
    bigCityStr,
    setBigCityStr,
    subCityID,
    setSubCityID,
    subCityStr,
    setSubCityStr,
  } = props;
  return (
    <>
      <ClassNames
        bigClassNames={bigClassNames}
        subBigClassNames={subBigClassNames}
        setBigClassID={setBigClassID}
        bigClassID={bigClassID}
        setBigClassStr={setBigClassStr}
        bigClassStr={bigClassStr}
        subClassID={subClassID}
        setSubClassID={setSubClassID}
        subClassStr={subClassStr}
        setSubClassStr={setSubClassStr}
      />
      <City
        bigCityNames={bigCityNames}
        subCityNames={subCityNames}
        bigCityID={bigCityID}
        setBigCityID={setBigCityID}
        bigCityStr={bigCityStr}
        setBigCityStr={setBigCityStr}
        subCityID={subCityID}
        setSubCityID={setSubCityID}
        subCityStr={subCityStr}
        setSubCityStr={setSubCityStr}
      />
    </>
  );
}

export default MenuIndex;
