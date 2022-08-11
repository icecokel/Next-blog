import React, { useState, useEffect, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../store/modules";
import dynamic from "next/dynamic";
import EditCategory from "../management/EditCategory";
import EditBlogInfo from "../management/EditBlogInfo";
import ManagementCp from "../management/ManagementCp";

const MENU_LIST = [
  "글쓰기",
  "카테고리 관리",
  "게시글 관리",
  "통계",
  "블로그 설정",
];

const NewPostCsr = dynamic(
  import("../../../src/components/management/NewPost"),
  { ssr: false }
);

const MamagementCt = () => {
  const [currentMenu, setCurrentMenu] = useState<string>(MENU_LIST[0]);
  const { userAuthority } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!userAuthority) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuthority]);

  const handleClickMenu = (no: number) => {
    setCurrentMenu(MENU_LIST[no]);
  };

  const getMenuContent = (): ReactElement => {
    const menuIndex = MENU_LIST.findIndex((menu) => menu === currentMenu);
    let component = <span></span>;
    switch (menuIndex) {
      case 0:
        component = <NewPostCsr />;
        break;
      case 1:
        component = <EditCategory />;
        break;
      case 2:
        component = <span>게시글 컴포넌트</span>;
        break;
      case 3:
        component = <span>통계 컴포넌트</span>;
        break;
      case 4:
        component = <EditBlogInfo />;
        break;
      default:
        <span></span>;
    }

    return component;
  };

  return (
    <ManagementCp
      menuList={MENU_LIST}
      handleClickMenu={handleClickMenu}
      currentMenu={currentMenu}
      currentMenuComponent={getMenuContent()}
    />
  );
};

export default MamagementCt;
