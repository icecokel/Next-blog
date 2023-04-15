import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BlogVO } from "../../../store/modules/blog";
import { MenuVO } from "../../../store/modules/menu";
import { setUser, UserVO } from "../../../store/modules/user";
import { setBlog } from "../../../store/modules/blog";
import { setMenu } from "../../../store/modules/menu";

export interface IInitializationProps {
  blog: BlogVO;
  users: UserVO;
  menus: MenuVO[];
}

// TODO 서버 사이트에서 디스 패치 할 것
const useDispatchInitialization = ({ blog, menus, users }: IInitializationProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setRedux();
  }, []);

  const setRedux = () => {
    dispatch(setBlog(blog));
    dispatch(setMenu(menus));
    dispatch(setUser(users));
  };
};

export default useDispatchInitialization;
