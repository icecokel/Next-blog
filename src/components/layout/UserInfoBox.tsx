import React, { useState } from "react";
import BaseModal from "../common/BaseModal";
import { UserVO } from "../../../store/modules/user";

const UserInfoBox = ({ userNickName }: { userNickName: string }) => {
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const UNKNOWN = "Sign in";

  const onClickLogIn = () => {
    if (userNickName) {
      return;
    }
    setIsOpenSignInModal(!isOpenSignInModal);
  };

  return (
    <>
      <div className="header-user-info" onClick={onClickLogIn}>
        {userNickName || UNKNOWN}
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

export default React.memo(UserInfoBox);
