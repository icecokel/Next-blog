import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import LoginIcon from "./LoginIcon";
import SearchIcon from "./SearchIcon";

const Header = () => {
  const { userNickName, userAuthority } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();

  const onClickLogo = () => {
    router.push("/blog/" + userNickName);
  };

  const onClickSettings = () => {
    router.push("/blog/" + userNickName + "/category/management");
  };

  return (
    <header className="header-wrap">
      <div className="logo" onClick={onClickLogo}>
        {userNickName}
        <i className="material-icons">spa</i>
      </div>
      <div className="icons-wrap">
        <LoginIcon />
        <SearchIcon />
        {userAuthority && (
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
