import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import CategoryBar from "./CategoryBar";
import UserInfoBox from "./UserInfoBox";
import SearchBox from "./SearchBox";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const onClickLogo = () => {
    router.push("/" + userInfo.userNickName);
  };

  return (
    <>
      <header className={"header-wrap"}>
        <UserInfoBox />
        <div className={"logo"} onClick={onClickLogo}>
          Eucalyptus<i className="material-icons">spa</i>
        </div>
        <SearchBox />
      </header>
      <CategoryBar />
    </>
  );
};

export default Header;
