import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import CategoryBar from "./CategoryBar";
import { UserVO } from "../../../store/modules/user";
import BaseModal from "../common/BaseModal";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const onClickLogo = () => {
    router.push("/" + userInfo.userNickName);
  };

  return (
    <>
      <header className={"header-wrap"}>
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
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const UNKNOWN = "Sign in";

  const onClickLogIn = () => {
    if (userInfo.userNickName) {
      return;
    }
    setIsOpenSignInModal(!isOpenSignInModal);
  };

  return (
    <>
      <div className="header-user-info" onClick={onClickLogIn}>
        {userInfo.userNickName || UNKNOWN}
      </div>
      <BaseModal isOpen={isOpenSignInModal} setIsOpen={setIsOpenSignInModal}>
        <div className="login-wrap">
          <input type="email" placeholder="email@email.com" />
          <input type="password" placeholder="PassWord1@3$" />
          <button> Sign In</button>
          <p> Social Sign In</p>
          <button className="sns-google"> Google</button>
        </div>
      </BaseModal>
    </>
  );
};

const SearchBox = () => {
  return (
    <div className={"search"}>
      <div>
        <i className="material-icons">search</i>
      </div>
    </div>
  );
};

export default Header;
