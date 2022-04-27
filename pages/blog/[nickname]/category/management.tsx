import React, { useState } from "react";
import NewPost from "../../../../src/components/management/NewPost";
import EditCategory from "../../../../src/components/management/EditCategory";
import EditBlogInfo from "../../../../src/components/management/EditBlogInfo";

const MENU_LIST = [
  "글쓰기",
  "카테고리 관리",
  "게시글 관리",
  "통계",
  "블로그 설정",
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
        return <NewPost />;
      case 1:
        return <EditCategory />;
      case 2:
        return <span>게시글 컴포넌트</span>;
      case 3:
        return <span>통계 컴포넌트</span>;
      case 4:
        return <EditBlogInfo />;
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
      <div className="management-content-wrap">
        <div className="management-content-title">
          <h2>{currentMenu}</h2>
        </div>
        <div className="management-content">{getMenuContent()}</div>
      </div>
    </div>
  );
};

export default ManagementPage;
