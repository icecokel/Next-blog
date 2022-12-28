import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import MenuIcon from "./MenuIcon";
import styles from "./Header.module.scss";

const Header = () => {
  const { nickname } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleClickLogo = () => {
    nickname && router.push("/blog/" + nickname);
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
          <MenuIcon />
          {/* {nickname && (
            <div className={styles.icon}>
              <i className="material-icons" onClick={handleClickSettings}>
                settings
              </i>
            </div>
          )} */}
        </div>
      </article>
    </header>
  );
};

export default Header;
