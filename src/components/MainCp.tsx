import styles from "./MainCp.module.scss";
import { useState } from "react";

const MainCp = () => {
  const [tab, setTab] = useState<"posts" | "inst">("posts");

  const handelClickPostsTabs = () => {
    setTab("posts");
  };
  const handelClickInstTabs = () => {
    setTab("inst");
  };
  return (
    <article className={styles.mainWrap}>
      <div className={styles.profile}>
        <h3>프로필</h3>
        <div>사진</div>
        <div>
          <p>이름</p>
          <p>간단 소개</p>
        </div>
      </div>
      <section className={styles.tabs}>
        <ul>
          <li
            className={tab === "posts" ? styles.activedTab : ""}
            onClick={handelClickPostsTabs}
          >
            글
          </li>
          <li
            className={tab === "inst" ? styles.activedTab : ""}
            onClick={handelClickInstTabs}
          >
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
    <div className={styles.profileDetail}>
      <h3>소개</h3>
    </div>
  );
};
