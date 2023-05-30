import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import useModal from "../common/BaseModal/useModal";
import styles from "./LoginIcon.module.scss";

const LOGIN_MESSAGE = "authenticated";

const LoginIcon = () => {
  const { status } = useSession();
  const isLogined = status === LOGIN_MESSAGE;
  const { open: loginOpen } = useModal({ title: "로그인", children: <LoginIcon.loginBox /> });
  const { open: logoutOpen, close } = useModal({
    title: "로그아웃",
    children: <LoginIcon.logoutBox closeModel={() => close()} />,
  });

  const handleClickModalOpen = () => {
    isLogined ? logoutOpen() : loginOpen();
  };

  return <label onClick={handleClickModalOpen}>{isLogined ? <Logout /> : <Login />}</label>;
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
