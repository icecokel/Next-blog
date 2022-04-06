import React, { useCallback, useEffect, useState } from "react";
import ApiOptions from "../../common/ApiOptions";
import useAxios from "../../common/hooks/useAxios";
import BaseModal from "../common/BaseModal";
import CryptoUtil from "../../common/CryptoUtil";
import SessionUtil from "../../common/SessionUtil";
import { SessionEnum } from "../../common/SessionEnum";
import { UserVO } from "../../../store/modules/user";
import Loader from "../common/Loader";

const UserInfoBox = () => {
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserVO>();
  const [isStartRequest, setIsStartRequest] = useState<boolean>(false);
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });

  useEffect(() => {
    getSessionUser();
  }, [isLogined]);

  const onClickModalOpen = () => {
    if (isLogined) {
      return;
    }
    setIsOpenSignInModal(!isOpenSignInModal);
  };

  const getSessionUser = useCallback(() => {
    if (isLogined) {
      return;
    }
    const encryptoText = SessionUtil.getSession(SessionEnum.userInfo);

    if (!encryptoText) {
      return;
    }
    const data = CryptoUtil.decrypt(encryptoText);

    setCurrentUser(data);
    setIsLogined(true);
  }, [isLogined]);

  return (
    <div className={isLogined ? "header-user-info" : "header-user-info-login"}>
      <label onClick={onClickModalOpen}>
        {currentUser?.userNickName || "Sign in"}
      </label>

      <BaseModal isOpen={isOpenSignInModal} setIsOpen={setIsOpenSignInModal}>
        {!isStartRequest ? (
          <LoginBox
            setFormData={setFormData}
            setIsStartRequest={setIsStartRequest}
          />
        ) : (
          <LoginConfirmBox
            setIsOpenSignInModal={setIsOpenSignInModal}
            setCurrentUser={setCurrentUser}
            formData={formData}
            setIsStartRequest={setIsStartRequest}
            setIsLogined={setIsLogined}
          />
        )}
      </BaseModal>
    </div>
  );
};

const LoginBox = ({
  setFormData,
  setIsStartRequest,
}: {
  setFormData: Function;
  setIsStartRequest: Function;
}) => {
  const onClickSignIn = (e: any) => {
    e.preventDefault();

    const email = e.target["email"].value;
    const password = e.target["password"].value;

    setIsStartRequest(true);
    setFormData({ email, password });
  };

  return (
    <div className="login-wrap">
      <form onSubmit={onClickSignIn}>
        <input type="email" placeholder="email@email.com" name="email" />
        <input type="password" placeholder="PassWord1@3$" name="password" />
        <button>Sign In</button>
      </form>
      <p> Social Sign In</p>
      <button className="sns-google"> Google</button>
    </div>
  );
};

const LoginConfirmBox = ({
  setIsOpenSignInModal,
  setCurrentUser,
  formData,
  setIsStartRequest,
  setIsLogined,
}: {
  formData: any;
  setIsOpenSignInModal: Function;
  setCurrentUser: Function;
  setIsStartRequest: Function;
  setIsLogined: Function;
}) => {
  const { isLoading, data, error } = useAxios(ApiOptions.login, formData);

  useEffect(() => {
    loginHandler(data?.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const loginHandler = (message: string) => {
    if (error) {
      alert(error);
      setIsOpenSignInModal(false);
      return;
    }

    if (!message) {
      return;
    }

    if (message === "Success") {
      setUserInfo();
      setIsOpenSignInModal(false);
      setIsLogined(true);
    }
  };

  const setUserInfo = useCallback(() => {
    const tempData = {
      userNo: "",
      email: formData.email,
      userName: "",
      userEnglishName: "",
      status: "",
      userAuthority: "",
      userNickName: "tempNick",
    };
    const text = CryptoUtil.encrypt(tempData);

    setCurrentUser(tempData),
      SessionUtil.setSession(SessionEnum.userInfo, text);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <Loader isLoading={isLoading}>
      <div className="login-wrap">
        <p className="error">계정정보가 정확하지 않습니다.</p>

        <button
          onClick={() => {
            setIsStartRequest(false);
          }}
        >
          확인
        </button>
      </div>
    </Loader>
  );
};

export default React.memo(UserInfoBox);
