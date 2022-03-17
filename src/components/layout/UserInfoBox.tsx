import React, { useState } from "react";
import BaseModal from "../common/BaseModal";

const UserInfoBox = () => {
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const UNKNOWN = "Sign in";
  // 임시 코드
  const userNickName = false;

  const onClickLogIn = () => {
    if (userNickName) {
      return;
    }
    setIsOpenSignInModal(!isOpenSignInModal);
  };

  return (
    <div
      className={userNickName ? "header-user-info" : "header-user-info-login"}
      onClick={onClickLogIn}
    >
      {userNickName || UNKNOWN}

      <BaseModal isOpen={isOpenSignInModal} setIsOpen={setIsOpenSignInModal}>
        <div className="login-wrap">
          <input type="email" placeholder="email@email.com" />
          <input type="password" placeholder="PassWord1@3$" />
          <button> Sign In</button>
          <p> Social Sign In</p>
          <button className="sns-google"> Google</button>
        </div>
      </BaseModal>
    </div>
  );
};

export default React.memo(UserInfoBox);
