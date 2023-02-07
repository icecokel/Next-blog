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
  code?: number | string;
}

const useDispatchInitialization = ({ blog, menus, users, code }: IInitializationProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (code === 404) {
      window.location.replace(window.location.origin + "/404");
    }
    setRedux();
  }, []);

  const setRedux = () => {
    dispatch(setBlog(blog));
    dispatch(setMenu(menus));
    dispatch(setUser(users));
  };
};

export default useDispatchInitialization;
