import React, { useState, useEffect } from "react";
import MainCp from "../MainCp";
import Loader from "../common/Loader";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import RequestUtil from "../../common/RequestUtil";
import SessionUtil from "../../common/SessionUtil";
import { SessionEnum } from "../../common/SessionEnum";
import { UserVO } from "../../../store/modules/user";
import { getBlogInfo } from "../../common/ApiOptions";
import { setUser } from "../../../store/modules/user";
import { setBlog } from "../../../store/modules/blog";
import { setCategory } from "../../../store/modules/category";

const MainCt = () => {
  const router = useRouter();
  const nickName = router.query.nickname;
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<UserVO>();
  const { data, error, isLoading } = useQuery<any>(
    "result",
    async () => await RequestUtil(getBlogInfo, { nickname: nickName })
  );

  useEffect(() => {
    setRedux();
    if (!currentUser) {
      getSessionUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickName, data]);

  const getSessionUser = () => {
    const data = SessionUtil.getSession(SessionEnum.userInfo);
    if (data) {
      setCurrentUser(data);
    }
  };

  const setRedux = () => {
    if (!data) {
      return;
    }
    dispatch(setBlog(data.data.item.blogInfo));
    dispatch(
      setUser({
        userNo: data.data.item.userInfo.userNo,
        email: data.data.item.userInfo.email,
        userName: "",
        userEnglishName: "",
        status: "",
        userAuthority: currentUser?.email === data.data.item.userInfo.email,
        userNickName: data.data.item.userInfo.nickName,
      })
    );
    dispatch(setCategory(data.data.item.categorys));
  };

  if (error) {
    <div></div>;
  }
  return (
    <Loader isLoading={isLoading}>
      <MainCp />
    </Loader>
  );
};

export default MainCt;
