import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import BaseModal from "../common/BaseModal";
import styles from "./LoginIcon.module.scss";

const LOGIN_MESSAGE = "authenticated";

const LoginIcon = () => {
  const [isOpenLogInModal, setIsOpenLogInModal] = useState<boolean>(false);
  const [isOpenLogOutModel, setIsOpenLogOutModal] = useState<boolean>(false);
  const { status } = useSession();
  const isLogined = status === LOGIN_MESSAGE;

  const handleClickModalOpen = () => {
    isLogined ? setIsOpenLogOutModal(!isOpenLogOutModel) : setIsOpenLogInModal(!isOpenLogInModal);
  };

  return (
    <div>
      <label onClick={handleClickModalOpen}>{isLogined ? <Logout /> : <Login />}</label>

      <BaseModal isOpen={isOpenLogInModal} setIsOpen={setIsOpenLogInModal} title="로그인">
        <LoginIcon.loginBox />
      </BaseModal>
      <BaseModal isOpen={isOpenLogOutModel} setIsOpen={setIsOpenLogOutModal} title="로그아웃">
        <LoginIcon.logoutBox closeModel={() => setIsOpenLogOutModal(!isOpenLogOutModel)} />
      </BaseModal>
    </div>
  );
};
LoginIcon.loginBox = () => {
  return (
    <div className={styles.loginWrapper}>
      <button className={styles.snsLogin} onClick={() => signIn("google")}>
        Google 로그인 하기
      </button>
    </div>
  );
};

interface ILogoutProps {
  closeModel: () => void;
}

LoginIcon.logoutBox = ({ closeModel }: ILogoutProps) => {
  return (
    <div className={styles.logoutWrapper}>
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
