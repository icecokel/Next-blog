import styles from "./MainCp.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import Image from "next/image";

const MainCp = () => {
  const user = useSelector((state: RootState) => state.user);
  const [tab, setTab] = useState<"posts" | "inst">("posts");

  const handelClickPostsTabs = () => {
    setTab("posts");
  };
  const handelClickInstTabs = () => {
    setTab("inst");
  };
  return (
    <article className={styles.mainWrap}>
      <div>
        <h2>프로필</h2>
        <div className={styles.profile}>
          <div>
            <div className={styles.profileImg}>
              <img src={user.profileImgPath} alt="profileImg" />
            </div>
          </div>

          <div className={styles.profileDetail}>
            <p>
              <label>닉네임 </label>
              <span>{user.nickname}</span>
            </p>
            <p>
              <label>email </label>
              <span>{user.email}</span>
            </p>
            <p>{user.introduction}</p>
          </div>
        </div>
      </div>
      <section className={styles.tabs}>
        <ul>
          <li className={tab === "posts" ? styles.activedTab : ""} onClick={handelClickPostsTabs}>
            글
          </li>
          <li className={tab === "inst" ? styles.activedTab : ""} onClick={handelClickInstTabs}>
            소개
          </li>
        </ul>
      </section>
      {tab === "posts" ? <MainCp.posts /> : <MainCp.inst />}
    </article>
  );
};

export default MainCp;

MainCp.posts = () => {
  return (
    <section className={styles.recentList}>
      <div>
        <h3>최근 게시한 글 (30)</h3>
      </div>
      <div>
        <h3>인기 글 (30)</h3>
      </div>
    </section>
  );
};

MainCp.inst = () => {
  return (
    <div>
      <h3>소개</h3>
    </div>
  );
};
