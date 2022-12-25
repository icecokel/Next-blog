import React, { useEffect } from "react";
import MainCp from "../MainCp";
import { BlogVO } from "../../../store/modules/blog";
import { UserVO } from "../../../store/modules/user";
import { CategoryVO } from "../../../store/modules/category";
import { useDispatch } from "react-redux";
import { setBlog } from "../../../store/modules/blog";
import { setCategory } from "../../../store/modules/category";
import { setUser } from "../../../store/modules/user";

interface IProps {
  blog: BlogVO;
  users: UserVO;
  categorys: CategoryVO[];
}

const MainCt = ({ blog, categorys, users }: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setRedux();
  }, []);

  const setRedux = () => {
    dispatch(setBlog(blog));
    dispatch(setCategory(categorys));
    dispatch(setUser(users));
  };

  return <MainCp />;
};

export default MainCt;
