import type {} from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBlog } from "../../../store/modules/blog";
import { setCategory } from "../../../store/modules/category";
import { setUser } from "../../../store/modules/user";
import RequestUtil from "../../../src/common/RequestUtil";
import ApiOptions from "../../../src/common/ApiOptions";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const nickName = router.query.nickname;
  const dispatch = useDispatch();
  const [result, setResult] = useState<any>();

  useEffect(() => {
    if (!result) {
      getBlogInfo();
    } else {
      setRedux();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickName, result]);

  const getBlogInfo = async () => {
    const { data } = await RequestUtil(ApiOptions.getBlogInfo, {
      nickname: nickName,
    });

    setResult(data.item);
  };

  const setRedux = () => {
    dispatch(setBlog(result.blogInfo));
    dispatch(
      setUser({
        userNo: result.userInfo.userNo,
        email: result.userInfo.email,
        userName: "",
        userEnglishName: "",
        status: "",
        userAuthority: false,
        userNickName: result.userInfo.nickName,
      })
    );
    dispatch(setCategory(result.categorys));
  };

  return (
    <div className="blog-main-wrap">
      <div className="thumbnail"></div>
    </div>
  );
};

export default Main;
