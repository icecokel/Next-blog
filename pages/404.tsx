import React from "react";
import ErrorLabel from "../src/components/common/ErrorLabel";

const NotFound = () => {
  return (
    <div className="error-wrap">
      <div className="error-box">
        <h2>페이지를 찾을 수 없습니다.</h2>
        <ErrorLabel text="주소를 확인해 주세요." />
      </div>
    </div>
  );
};

export default NotFound;
