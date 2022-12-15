import React from "react";
import styles from "./MainCp.module.scss";

const MainCp = () => {
  return (
    <article className={styles.mainWrap}>
      <div className={styles.thumbnail}>
        <img src={"/resources/images/test.jpg"} alt="thumnail" />
      </div>
      <div className={styles.recentList}>
        <p>최근 게시한 글 (30)</p>
      </div>
    </article>
  );
};

export default MainCp;
