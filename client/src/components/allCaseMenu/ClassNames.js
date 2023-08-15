import React from "react";

function ClassNames(props) {
  const {
    bigClassNames,
    subBigClassNames,
    setSubClassStr,
    subClassStr,
    setSubClassID,
    subClassID,
    bigClassStr,
    setBigClassStr,
    setBigClassID,
    bigClassID,
  } = props;

  // 處理母類別的字串
  const handleBigClass = (id) => {
    setBigClassID(id);
    if (bigClassStr.indexOf(id) === -1) {
      // 進到頁面是否為第一次做篩選，為了避免,號
      if (bigClassStr === "null" || bigClassStr === "") {
        setBigClassStr(bigClassStr.replace("null", `${id}`)); // 將初始的null替換掉
      } else {
        setBigClassStr((preState) => preState + "," + id);
      }
    }
    // 假如重複點選判斷狀態
    if (bigClassStr.match(id)) {
      if (bigClassStr.indexOf(`${id},`) !== -1) {
        setBigClassStr(bigClassStr.replace(`${id},`, "")); // 處理【A01,】這種狀態
      } else if (bigClassStr.indexOf(`,${id}`) !== -1) {
        setBigClassStr(bigClassStr.replace(`,${id}`, "")); // 處理【,A01】這種狀態
      } else {
        setBigClassStr("null"); // 處理【A01】這種狀態=> 這會報錯
      }
    }
  };

  // 處理子類別的字串
  const handleSubClass = (e) => {
    const { id } = e.target; // 取得代號
    setSubClassID(id);
    if (subClassStr.indexOf(id) === -1) {
      // 進到頁面是否為第一次做篩選，為了避免,號
      if (subClassStr === "null" || subClassStr === "") {
        setSubClassStr(subClassStr.replace("null", `${id}`)); // 將初始的null替換掉
      } else {
        setSubClassStr((preState) => preState + "," + id);
      }
    }
    // 假如重複點選判斷狀態
    if (subClassStr.match(id)) {
      if (subClassStr.indexOf(`${id},`) !== -1) {
        setSubClassStr(subClassStr.replace(`${id},`, "")); // 處理【A01,】這種狀態
      } else if (subClassStr.indexOf(`,${id}`) !== -1) {
        setSubClassStr(subClassStr.replace(`,${id}`, "")); // 處理【,A01】這種狀態
      } else {
        setSubClassStr("null"); // 處理【A01】這種狀態=> 這會報錯
      }
    }
  };
  return (
    <>
      {bigClassNames.map((items, index) => (
        <div className="mb-3 category" key={index}>
          <button
            className="btn btn-secondary w-100"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${items.bigClassName}`}
            data-bs-id={`${items.bigClassID}`} // 賦予代號
            aria-expanded="false"
            aria-controls={`${items.bigClassName}`}
            onClick={(e) => {
              handleBigClass(e.target.dataset["bsId"]);
            }}
          >
            {items.bigClassName}
          </button>
          <div className="collapse multi-collapse" id={`${items.bigClassName}`}>
            <div className="card card-body">
              <ul className="list-group">
                {subBigClassNames.map((item, index) => (
                  <>
                    {item["bigClassID"] === items.bigClassID && (
                      <li className="list-group-item p-0" key={index}>
                        <input
                          type="checkbox"
                          id={`${item.classID}`}
                          name={`${item.bigClassID}`}
                          onClick={(e) => {
                            handleSubClass(e);
                          }}
                        />
                        <label htmlFor={`${item.classID}`}>
                          {item.className}
                        </label>
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ClassNames;
