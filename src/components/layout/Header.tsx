import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import LoginIcon from "./LoginIcon";
import MenuIcon from "./MenuIcon";

const Header = () => {
  const { userNickName, userAuthority } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();

  const handleClickLogo = () => {
    router.push("/blog/" + userNickName);
  };

  const handleClickSettings = () => {
    router.push("/blog/" + userNickName + "/category/management");
  };

  return (
    <header className="header-wrap">
      <div className="logo" onClick={handleClickLogo}>
        {userNickName}
        <i className="material-icons">spa</i>
      </div>
      <div className="icons-wrap">
        <LoginIcon />
        <MenuIcon />
        {userAuthority && (
          <div className="header-icon">
            <i className="material-icons" onClick={handleClickSettings}>
              settings
            </i>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
