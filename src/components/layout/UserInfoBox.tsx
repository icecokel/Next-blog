import React, { useCallback, useEffect, useState } from "react";
import ApiOptions from "../../common/ApiOptions";
import useAxios from "../../common/hooks/useAxios";
import BaseModal from "../common/BaseModal";
import CryptoUtil from "../../common/CryptoUtil";
import SessionUtil from "../../common/SessionUtil";
import { SessionEnum } from "../../common/SessionEnum";

const UserInfoBox = () => {
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const { isLoading, data, error } = useAxios(ApiOptions.login, formData);

  // 임시 코드
  const userNickName = false;

  useEffect(() => {
    if (data?.message === "Success") {
      setUserInfo();
      setIsOpenSignInModal(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, formData]);

  const onClickLogIn = () => {
    if (userNickName) {
      return;
    }
    setIsOpenSignInModal(!isOpenSignInModal);
  };

  const onClickSignIn = (e: any) => {
    e.preventDefault();

    const email = e.target["email"].value;
    const password = e.target["password"].value;

    setFormData({ email, password });
  };

  const setUserInfo = useCallback(() => {
    const text = CryptoUtil.encrypt({ email: formData.email });
    SessionUtil.setSession(SessionEnum.userInfo, text);
  }, [formData]);

  return (
    <div
      className={userNickName ? "header-user-info" : "header-user-info-login"}
    >
      <label onClick={onClickLogIn}>{userNickName || "Sign in"}</label>

      <BaseModal isOpen={isOpenSignInModal} setIsOpen={setIsOpenSignInModal}>
        <div className="login-wrap">
          <form onSubmit={onClickSignIn}>
            <input type="email" placeholder="email@email.com" name="email" />
            <input type="password" placeholder="PassWord1@3$" name="password" />
            <button>Sign In</button>
          </form>
          <p> Social Sign In</p>
          <button className="sns-google"> Google</button>
        </div>
      </BaseModal>
    </div>
  );
};

export default React.memo(UserInfoBox);
