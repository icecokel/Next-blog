import type {} from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBlog } from "../../../store/modules/blog";
import { setCategory } from "../../../store/modules/category";
import { setUser } from "../../../store/modules/user";
import RequestUtil from "../../../src/common/RequestUtil";
import ApiOptions from "../../../src/common/ApiOptions";
import { useRouter } from "next/router";
import { UserVO } from "../../../store/modules/user";
import SessionUtil from "../../../src/common/SessionUtil";
import { SessionEnum } from "../../../src/common/SessionEnum";

const Main = () => {
  const router = useRouter();
  const nickName = router.query.nickname;
  const dispatch = useDispatch();
  const [result, setResult] = useState<any>();
  const [currentUser, setCurrentUser] = useState<UserVO>();

  useEffect(() => {
    if (!result) {
      getBlogInfo();
    } else {
      setRedux();
    }

    if (!currentUser) {
      getSessionUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickName, result]);

  const getBlogInfo = async () => {
    const { data } = await RequestUtil(ApiOptions.getBlogInfo, {
      nickname: nickName,
    });

    setResult(data.item);
  };

  const getSessionUser = () => {
    const data = SessionUtil.getSession(SessionEnum.userInfo);

    setCurrentUser(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        userAuthority: currentUser?.email === result.userInfo.email,
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
