import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import useAuth from "../../common/hooks/useAuth";
import styles from "./Header.module.scss";
import LoginIcon from "./LoginIcon";
import MenuIcon from "./MenuIcon";

const Header = () => {
  const { nickname } = useSelector((state: RootState) => state.user);
  const { faviconPath } = useSelector((state: RootState) => state.blog);
  const { isOwner } = useAuth();
  const router = useRouter();

  const handleClickLogo = () => {
    router.push(`${nickname ? `/blog/${nickname}` : "/"}`);
  };

  const handleClickSettings = () => {
    router.push("/blog/" + nickname + "/m/management");
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={faviconPath} />
      </Head>
      <header className={styles.wrapper}>
        <article className={styles.headerWrapper}>
          <div className={styles.logo} onClick={handleClickLogo}>
            {nickname}
            <span className="material-icons">spa</span>
          </div>
          <div className={styles.iconsWrapper}>
            <LoginIcon />
            <MenuIcon />
            {isOwner && (
              <div className={styles.icon}>
                <span className="material-icons" onClick={handleClickSettings}>
                  settings
                </span>
              </div>
            )}
          </div>
        </article>
      </header>
    </>
  );
};

export default Header;
