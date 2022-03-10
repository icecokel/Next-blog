import type {} from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBlog } from "../store/modules/blog";
import { setCategory } from "../store/modules/category";
import { setUser } from "../store/modules/user";
import useAxios from "../src/hooks/useAxios";
import ApiOptions from "../src/common/ApiOptions";

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
