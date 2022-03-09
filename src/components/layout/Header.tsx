import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import CategoryBar from "./CategoryBar";
import { UserVO } from "../../../store/modules/user";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const onClickLogo = () => {
    router.push("/" + userInfo.userNickName);
  };

  return (
    <>
      <header className={"wrap"}>
        <UserInfoBox userInfo={userInfo} />
        <div className={"logo"} onClick={onClickLogo}>
          Eucalyptus<i className="material-icons">spa</i>
        </div>
        <SearchBox />
      </header>
      <CategoryBar></CategoryBar>
    </>
  );
};

const UserInfoBox = ({ userInfo }: { userInfo: UserVO }) => {
  const UNKNOWN = "알 수 없음";

  return (
    <div className="header-user-info">{userInfo.userNickName ?? UNKNOWN}</div>
  );
};

const SearchBox = () => {
  return (
    <div className={"search"}>
      <span>Search</span>
      <div>
        <i className="material-icons">search</i>
      </div>
    </div>
  );
};

export default Header;
