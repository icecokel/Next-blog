import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo, useState } from "react";
import useAuth from "../../common/hooks/useAuth";
import EditBlogInfo from "./EditBlogInfo";
import EditMenu from "./EditMenu";
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentMenu(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: "1px solid #e6f0ef", marginBottom: "20px" }}>
        <Tabs value={currentMenu} onChange={handleChange}>
          {MENU_LIST.map((menu, index) => {
            return <Tab label={menu} key={"memu_" + index} value={menu} />;
          })}
        </Tabs>
      </Box>
      <div>{component}</div>
    </div>
  );
};

export default MamagementScreen;
