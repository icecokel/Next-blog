import React, { useState, useMemo, useRef } from "react";
import { Quill } from "react-quill";
import ReactQuill from "react-quill";

const MENU_LIST = [
  "글쓰기",
  "카테고리 관리",
  "게시글 관리",
  "통계",
  "블로그 설정",
];

const formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

const ManagementPage = () => {
  const [currentMenu, setCurrentMenu] = useState<string>(MENU_LIST[0]);

  const onClickMenu = (e: any) => {
    const { id } = e.target;
    const no = Number.parseInt((id as string).replace("memu_", ""));
    setCurrentMenu(MENU_LIST[no]);
  };

  const getMenuContent = () => {
    const menuIndex = MENU_LIST.findIndex((menu) => menu === currentMenu);

    switch (menuIndex) {
      case 0:
        return <WritingNewPost></WritingNewPost>;
      case 1:
        return <span>카테고리 컴포넌트</span>;
      case 2:
        return <span>게시글 컴포넌트</span>;
      case 3:
        return <span>통계 컴포넌트</span>;
      case 4:
        return <span>블로그 컴포넌트</span>;
    }
  };

  return (
    <div className="management-wrap">
      <div className="management-menu">
        <ul>
          {MENU_LIST.map((menu, index) => {
            return (
              <li
                key={"memu_" + index}
                onClick={onClickMenu}
                id={"memu_" + index}
              >
                {menu}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="management-content">
        <div>
          <h2>{currentMenu}</h2>
        </div>
        <div>{getMenuContent()}</div>
      </div>
    </div>
  );
};

const WritingNewPost = () => {
  const quillRef = useRef<any>();
  const [htmlContent, setHtmlContent] = useState<string>();
  const modules = useMemo(
    () => ({
      toolbar: {
        // 툴바에 넣을 기능
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
        ],
      },
    }),
    []
  );

  return (
    <>
      <ReactQuill
        // ref={quillRef}
        ref={(element) => {
          if (element !== null) {
            quillRef.current = element;
          }
        }}
        value={htmlContent}
        onChange={setHtmlContent}
        modules={modules}
        theme="snow"
        style={{ height: "85%", marginBottom: "6%" }} // style
      />
    </>
  );
};

export default ManagementPage;
