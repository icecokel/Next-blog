import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import MenuIcon from "./MenuIcon";
import styles from "./Header.module.scss";
import LoginIcon from "./LoginIcon";
import useAuth from "../../common/hooks/useAuth";

const Header = () => {
  const { nickname } = useSelector((state: RootState) => state.user);
  const { isOwner } = useAuth();
  const router = useRouter();

  const handleClickLogo = () => {
    if (nickname) {
      router.push("/blog/" + nickname);
    } else {
      router.push("/");
    }
  };

  const handleClickSettings = () => {
    router.push("/blog/" + nickname + "/category/management");
  };

  return (
    <header className={styles.wrapper}>
      <article className={styles.headerWrapper}>
        <div className={styles.logo} onClick={handleClickLogo}>
          {nickname}
          <i className="material-icons">spa</i>
        </div>
        <div className={styles.iconsWrapper}>
          <LoginIcon />
          <MenuIcon />
          {isOwner && (
            <div className={styles.icon}>
              <i className="material-icons" onClick={handleClickSettings}>
                settings
              </i>
            </div>
          )}
        </div>
      </article>
    </header>
  );
};

export default Header;
