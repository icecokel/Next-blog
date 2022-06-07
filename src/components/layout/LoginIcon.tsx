import React, { useCallback, useEffect, useRef, useState } from "react";
import ApiOptions from "../../common/ApiOptions";
import RequestUtil from "../../common/RequestUtil";
import BaseModal from "../common/BaseModal";
import SessionUtil from "../../common/SessionUtil";
import { SessionEnum } from "../../common/SessionEnum";
import { UserVO } from "../../../store/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setUser } from "../../../store/modules/user";
import BaseInput from "../common/BaseInput";

interface LoginForm {
  email: string;
  password: string;
}

const LoginIcon = () => {
  const [isOpenLogInModal, setIsOpenLogInModal] = useState<boolean>(false);
  const [isOpenLogOutModel, setIsOpenLogOutModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserVO>();
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getSessionUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogined]);

  useEffect(() => {
    setUserAuthority(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleClickModalOpen = () => {
    isLogined
      ? setIsOpenLogOutModal(!isOpenLogOutModel)
      : setIsOpenLogInModal(!isOpenLogInModal);
  };

  const handleClickLogOut = () => {
    SessionUtil.removeSession(SessionEnum.userInfo);
    setCurrentUser(undefined);
    setIsOpenLogOutModal(!isOpenLogOutModel);
    setIsLogined(false);
    setUserAuthority(false);
  };

  const setUserAuthority = (userAuthority: boolean) => {
    const tempUser = { ...user };

    if (tempUser.email !== currentUser?.email) {
      return;
    }

    tempUser["userAuthority"] = userAuthority;
    dispatch(setUser(tempUser));
  };

  const getSessionUser = useCallback(() => {
    if (isLogined) {
      return;
    }

    const data = SessionUtil.getSession(SessionEnum.userInfo);

    if (!data) {
      return;
    }

    setCurrentUser(data);
    setIsLogined(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogined]);

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
        <LoginBox
          setCurrentUser={setCurrentUser}
          setIsOpenSignInModal={setIsOpenLogInModal}
          setIsLogined={setIsLogined}
        />
      </BaseModal>
      <BaseModal isOpen={isOpenLogOutModel} setIsOpen={setIsOpenLogOutModal}>
        <div className="logout-wrap">
          로그아웃을 진행할까요?
          <div>
            <button
              onClick={() => {
                setIsOpenLogOutModal(!isOpenLogOutModel);
              }}
            >
              취소
            </button>
            <button className="btn-success" onClick={handleClickLogOut}>
              확인
            </button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

interface LoginFormVO {
  email: string;
  password: string;
}

const LoginBox = ({
  setCurrentUser,
  setIsOpenSignInModal,
  setIsLogined,
}: {
  setCurrentUser: Function;
  setIsOpenSignInModal: Function;
  setIsLogined: Function;
}) => {
  const [isEmptyInfo, setIsEmptyInfo] = useState<boolean>();
  const [formData, setFormData] = useState<LoginFormVO>({
    email: "",
    password: "",
  });
  const handleClickSignIn = (e: any) => {
    e.preventDefault();

    const email = e.target["email"].value;
    const password = e.target["password"].value;
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!email || !password || !regExp.test(email)) {
      setIsEmptyInfo(true);
      return;
    }

    login({ email, password });
  };

  const login = async (param: LoginForm) => {
    const { data } = await RequestUtil(ApiOptions.login, param);
    if (!data) {
      return;
    }

    const test = {
      userNo: "",
      email: param.email,
      userName: "",
      userEnglishName: "",
      status: "",
      userAuthority: false,
      userNickName: "",
    } as UserVO;

    SessionUtil.setSession(SessionEnum.userInfo, test);
    setCurrentUser(test);
    setIsOpenSignInModal(false);
    setIsLogined(true);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-wrap">
      <form onSubmit={handleClickSignIn}>
        {isEmptyInfo && (
          <span className="error"> 로그인 정보를 입력해 주세요.</span>
        )}
        <BaseInput
          type="email"
          placeholder="email@email.com"
          name="email"
          value={formData.email}
          onChangeValue={handleChangeText}
        />
        <BaseInput
          type="password"
          placeholder="PassWord1@3$"
          name="password"
          value={formData.password}
          onChangeValue={handleChangeText}
        />
        <button>Sign In</button>
      </form>
      <p> Social Sign In</p>
      <button className="sns-google"> Google</button>
    </div>
  );
};

export default React.memo(LoginIcon);
