import React, { useEffect } from "react";
import MainCp from "../MainCp";
import { BlogVO } from "../../../store/modules/blog";
import { UserVO } from "../../../store/modules/user";
import { MenuVo } from "../../../store/modules/menu";
import { useDispatch } from "react-redux";
import { setBlog } from "../../../store/modules/blog";
import { setMenu } from "../../../store/modules/menu";
import { setUser } from "../../../store/modules/user";

interface IProps {
  blog: BlogVO;
  users: UserVO;
  menus: MenuVo[];
}

const MainCt = ({ blog, menus, users }: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setRedux();
  }, []);

  const setRedux = () => {
    dispatch(setBlog(blog));
    dispatch(setMenu(menus));
    dispatch(setUser(users));
  };

  return <MainCp />;
};

export default MainCt;
