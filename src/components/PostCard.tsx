import React from "react";
import { PostVO } from "../common/Model";
import { fromNow } from "../common/DateUtil";
import styles from "./PostCard.module.scss";

const PostCard = ({ title, registDate, contents }: PostVO) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.titleWarpper}>
        <div className={styles.postTitle}>
          <h1>{title}</h1>
        </div>
        <div className={styles.postDetailInfo}>{fromNow(new Date(registDate))}</div>
      </div>
      <div className={styles.contentsWrapper}>
        <div className={styles.contents} dangerouslySetInnerHTML={{ __html: contents }} />
      </div>
    </article>
  );
};

export default PostCard;
