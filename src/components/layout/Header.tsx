import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import LoginIcon from "./LoginIcon";
import SearchIcon from "./SearchIcon";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const onClickLogo = () => {
    router.push("/" + userInfo.userNickName);
  };

  const onClickSettings = () => {
    router.push("/category/management");
  };

  return (
    <header className="header-wrap">
      <div className="logo" onClick={onClickLogo}>
        Eucalyptus<i className="material-icons">spa</i>
      </div>
      <div className="icons-wrap">
        <LoginIcon />
        <SearchIcon />
        {userInfo.userAuthority && (
          <div className="header-icon">
            <i className="material-icons" onClick={onClickSettings}>
              settings
            </i>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
