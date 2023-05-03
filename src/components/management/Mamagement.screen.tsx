import React, { useState, useEffect, ReactElement, useMemo } from "react";
import { useRouter } from "next/router";
import EditMenu from "./EditMenu";
import EditBlogInfo from "./EditBlogInfo";
import ManagementCp from "./ManagementCp";
import useAuth from "../../common/hooks/useAuth";
import NewPost from "./NewPost";

const MENU_LIST = ["글쓰기", "메뉴 관리", "블로그 설정"];

const MamagementScreen = () => {
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

    switch (menuIndex) {
      case 0:
        return <NewPost />;
      case 1:
        return <EditMenu />;
      case 2:
        return <EditBlogInfo />;
      default:
        return <></>;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const component = useMemo(() => getMenuContent(), [currentMenu]);

  return (
    <ManagementCp
      menuList={MENU_LIST}
      handleClickMenu={handleClickMenu}
      currentMenu={currentMenu}
      currentMenuComponent={component}
    />
  );
};

export default MamagementScreen;
