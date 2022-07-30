import React, { useEffect, useState } from "react";
import EditCategory from "../../../../src/components/management/EditCategory";
import EditBlogInfo from "../../../../src/components/management/EditBlogInfo";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/modules";
import { useRouter } from "next/router";
import { NextPage } from "next";

const MENU_LIST = [
  "글쓰기",
  "카테고리 관리",
  "게시글 관리",
  "통계",
  "블로그 설정",
];

const NewPostCsr = dynamic(
  import("../../../../src/components/management/NewPost"),
  { ssr: false }
);

const ManagementPage: NextPage = () => {
  const [currentMenu, setCurrentMenu] = useState<string>(MENU_LIST[0]);
  const { userAuthority } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!userAuthority) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuthority]);

  const handleClickMenu = (e: any) => {
    const { id } = e.target;
    const no = Number.parseInt((id as string).replace("memu_", ""));
    setCurrentMenu(MENU_LIST[no]);
  };

  const getMenuContent = () => {
    const menuIndex = MENU_LIST.findIndex((menu) => menu === currentMenu);

    switch (menuIndex) {
      case 0:
        return <NewPostCsr />;
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
                onClick={handleClickMenu}
                id={"memu_" + index}
                className={"mt-05 mb-05"}
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
