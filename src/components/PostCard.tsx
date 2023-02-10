import React from "react";
import { PostVO } from "../common/constant/Model";
import { fromNow } from "../common/DateUtil";
import styles from "./PostCard.module.scss";
import { UserVO } from "../../store/modules/user";

interface IProps {
  post: PostVO;
  user: UserVO;
}

const PostCard = ({ post, user }: IProps) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.titleWarpper}>
        <div className={styles.postTitle}>
          <h1>{post.title}</h1>
        </div>
        <div className={styles.postDetailInfo}>{fromNow(new Date(post.registDate))}</div>
      </div>
      <div className={styles.contentsWrapper}>
        <div className={styles.contents} dangerouslySetInnerHTML={{ __html: post.contents }} />
      </div>
      <div className={styles.profile}>
        <img className={styles.profileImg} src={user.profileImgPath} alt="profileImg" />
        <div>
          <p>{user.nickname}</p>
          <p>{user.introduction}</p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
