import React, { useState, useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import EditCategory from "../management/EditCategory";
import EditBlogInfo from "../management/EditBlogInfo";
import ManagementCp from "../management/ManagementCp";
import useAuth from "../../common/hooks/useAuth";
import NewPost from "../management/NewPost";

const MENU_LIST = ["글쓰기", "카테고리 관리", "블로그 설정"];

const MamagementCt = () => {
  const [currentMenu, setCurrentMenu] = useState<string>(MENU_LIST[0]);
  const { isOwner } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isOwner) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner]);

  const handleClickMenu = (no: number) => {
    setCurrentMenu(MENU_LIST[no]);
  };

  const getMenuContent = (): ReactElement => {
    const menuIndex = MENU_LIST.findIndex((menu) => menu === currentMenu);
    let component = <span></span>;
    switch (menuIndex) {
      case 0:
        component = <NewPost />;
        break;
      case 1:
        component = <EditCategory />;
        break;
      case 2:
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
