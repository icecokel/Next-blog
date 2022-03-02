import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../src/components/PostCard";
import { setBlog } from "../store/modules/blog";
import { setCategory } from "../store/modules/category";
import { setUser } from "../store/modules/user";
import { RootState } from "../store/modules";
import Loader from "../src/components/common/Loader";
import useAxios from "../src/hooks/useAxios";
import ApiOptions, { ApiOption } from "../src/common/ApiOptions";
const item = {
  title: "제목",
  hits: 11,
  registerDate: "2022/01/22",
  thumbnailPath: "/resources/images/test.jpg",
};

const Main = () => {
  const dispatch = useDispatch();
  const blogInfo = useAxios(ApiOptions.getBlogInfo);

  useEffect(() => {
    if (!blogInfo.isLoading) {
      setBlogInfo();
      setUserInfo();
      setCategorys();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogInfo.isLoading]);

  const setBlogInfo = () => {
    dispatch(setBlog(blogInfo.data.item.blogInfo));
  };

  const setUserInfo = () => {
    dispatch(
      setUser({
        userNo: blogInfo.data.item.userInfo.userNo,
        email: "",
        userName: "",
        userEnglishName: "",
        status: "",
        userAuthority: "",
        userNickName: blogInfo.data.item.userInfo.nickName,
      })
    );
  };

  const setCategorys = () => {
    dispatch(setCategory(blogInfo.data.item.categorys));
  };

  return (
    <div>
      <div className={"thumbnail"}></div>
    </div>
  );
};

export default Main;
