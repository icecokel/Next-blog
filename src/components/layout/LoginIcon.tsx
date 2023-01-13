import React, { useState } from "react";
import BaseModal from "../common/BaseModal";

import { signIn, signOut, useSession } from "next-auth/react";

const LOGIN_MESSAGE = "authenticated";

const LoginIcon = () => {
  const [isOpenLogInModal, setIsOpenLogInModal] = useState<boolean>(false);
  const [isOpenLogOutModel, setIsOpenLogOutModal] = useState<boolean>(false);
  const { status } = useSession();
  const isLogined = status === LOGIN_MESSAGE;

  const handleClickModalOpen = () => {
    if (isLogined) {
      setIsOpenLogOutModal(!isOpenLogOutModel);
    } else {
      setIsOpenLogInModal(!isOpenLogInModal);
    }
  };

  return (
    <div className="header-icon">
      <label onClick={handleClickModalOpen}>
        {isLogined ? (
          <i className="material-icons">logout</i>
        ) : (
          <i className="material-icons">account_circle</i>
        )}
      </label>

      <BaseModal isOpen={isOpenLogInModal} setIsOpen={setIsOpenLogInModal}>
        <LoginIcon.loginBox />
      </BaseModal>
      <BaseModal isOpen={isOpenLogOutModel} setIsOpen={setIsOpenLogOutModal}>
        <LoginIcon.logoutBox closeModel={() => setIsOpenLogOutModal(!isOpenLogOutModel)} />
      </BaseModal>
    </div>
  );
};
LoginIcon.loginBox = () => {
  return (
    <div className="login-wrap">
      <button className="sns-google" onClick={() => signIn()}>
        소셜 로그인 하기
      </button>
    </div>
  );
};

interface ILogoutProps {
  closeModel: () => void;
}

LoginIcon.logoutBox = ({ closeModel }: ILogoutProps) => {
  return (
    <div className="logout-wrap">
      로그아웃을 진행할까요?
      <div>
        <button onClick={closeModel}>취소</button>
        <button className="btn-success" onClick={() => signOut()}>
          확인
        </button>
      </div>
    </div>
  );
};

export default React.memo(LoginIcon);
