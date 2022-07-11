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
import MainCp from "../../../src/components/MainCp";
import { useQuery, QueryClient, dehydrate } from "react-query";
import Loader from "../../../src/components/common/Loader";

const Main = () => {
  const router = useRouter();
  const nickName = router.query.nickname;
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<UserVO>();
  const { data, error, isLoading } = useQuery<any>(
    "result",
    async () =>
      await RequestUtil(ApiOptions.getBlogInfo, { nickname: nickName })
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
    setCurrentUser(data);
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

export default Main;
