import React, { useCallback, useEffect, useState } from "react";
import ApiOptions from "../../common/ApiOptions";
import RequestUtil from "../../common/RequestUtil";
import BaseModal from "../common/BaseModal";
import CryptoUtil from "../../common/CryptoUtil";
import SessionUtil from "../../common/SessionUtil";
import { SessionEnum } from "../../common/SessionEnum";
import { UserVO } from "../../../store/modules/user";
import Loader from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setUser } from "../../../store/modules/user";
import { async } from "@firebase/util";

const LoginIcon = () => {
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserVO>();
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getSessionUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogined]);

  useEffect(() => {
    setUserAuthority();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const onClickModalOpen = () => {
    if (isLogined) {
      return;
    }
    setIsOpenSignInModal(!isOpenSignInModal);
  };

  const setUserAuthority = () => {
    const tempUser = { ...user };
    if (tempUser.email !== currentUser?.email) {
      return;
    }

    tempUser["userAuthority"] = true;

    dispatch(setUser(tempUser));
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

    setUserAuthority();
    setCurrentUser(data);
    setIsLogined(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogined]);

  return (
    <div className="header-icon">
      <label onClick={onClickModalOpen}>
        {currentUser?.email ? (
          <i className="material-icons">logout</i>
        ) : (
          <i className="material-icons">account_circle</i>
        )}
      </label>

      <BaseModal isOpen={isOpenSignInModal} setIsOpen={setIsOpenSignInModal}>
        <LoginBox
          setCurrentUser={setCurrentUser}
          setIsOpenSignInModal={setIsOpenSignInModal}
        />
      </BaseModal>
    </div>
  );
};
// RequestUtil(ApiOptions.login, formData);
const LoginBox = ({
  setCurrentUser,
  setIsOpenSignInModal,
}: {
  setCurrentUser: Function;
  setIsOpenSignInModal: Function;
}) => {
  const onClickSignIn = async (e: any) => {
    e.preventDefault();

    const email = e.target["email"].value;
    const password = e.target["password"].value;

    const { data } = await RequestUtil(ApiOptions.login, { email, password });
    if (!data) {
      return;
    }

    const test = {
      userNo: "",
      email: email,
      userName: "",
      userEnglishName: "",
      status: "",
      userAuthority: false,
      userNickName: "",
    } as UserVO;
    setCurrentUser(test);
    setIsOpenSignInModal(false);
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

export default React.memo(LoginIcon);
