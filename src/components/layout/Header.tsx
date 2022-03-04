import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import CategoryBar from "./CategoryBar";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const onClickLogo = () => {
    router.push("/" + userInfo.userNickName);
  };

  return (
    <>
      <header className={"wrap"}>
        <div>{userInfo.userNickName ?? "UnknownUser"}</div>
        <div className={"logo"} onClick={onClickLogo}>
          Eucalyptus<i className="material-icons">spa</i>
        </div>
        <div className={"search"}>
          <span>Search</span>
          <div>
            <i className="material-icons">search</i>
          </div>
        </div>
      </header>
      <CategoryBar></CategoryBar>
    </>
  );
};

export default Header;
