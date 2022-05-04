import React from "react";

const EditBlogInfo = () => {
  return (
    <div className="edit-bloginfo">
      <div className="edit-bloginfo-item">
        <label>블로그 이름</label>
        <input type="text" />
      </div>
      <div className="edit-bloginfo-item">
        <label>블로그 활동명</label>
        <input type="text" />
      </div>
      <div className="edit-bloginfo-item">
        <label>블로그 설명</label>
        <input type="text" />
      </div>
      <div className="edit-bloginfo-item">
        <label>파비콘 설정</label>
        <input type="text" />
      </div>
      <div className="button-wrap">
        <button className="button-half">저장</button>
      </div>
    </div>
  );
};

export default EditBlogInfo;
