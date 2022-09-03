import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import LoginIcon from "./LoginIcon";
import MenuIcon from "./MenuIcon";
import styles from "../../../styles/header.module.scss";

const Header = () => {
  const { userNickName, userAuthority } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();

  const handleClickLogo = () => {
    userNickName && router.push("/blog/" + userNickName);
  };

  const handleClickSettings = () => {
    router.push("/blog/" + userNickName + "/category/management");
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.logo} onClick={handleClickLogo}>
        {userNickName}
        <i className="material-icons">spa</i>
      </div>
      <div className={styles.iconsWrapper}>
        <LoginIcon />
        <MenuIcon />
        {userAuthority && (
          <div className={styles.icon}>
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
