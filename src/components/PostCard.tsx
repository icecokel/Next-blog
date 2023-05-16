import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { fromNow } from "../common/util/DateUtil";
import styles from "./PostCard.module.scss";
import { CommentVO, PostVO } from "../../store/modules/post";
import Comments from "./Comments";

interface IProps {
  post: PostVO;
}

const PostCard = ({ post }: IProps) => {
  const { nickname, introduction, profileImgPath } = useSelector((state: RootState) => state.user);
  return (
    <article className={styles.wrapper}>
      <div className={styles.titleWarpper}>
        <div className={styles.postTitle}>
          <h1>{post.title}</h1>
        </div>
        <div className={styles.postDetailInfo}>{fromNow(new Date(post.registDate))}</div>
      </div>
      <div className={styles.contentsWrapper}>
        <div
          className={styles.contents}
          dangerouslySetInnerHTML={{ __html: post.contents ?? "" }}
        />
      </div>
      <div className={styles.profile}>
        <img className={styles.profileImg} src={profileImgPath} alt="profileImg" />
        <div>
          <p>{nickname}</p>
          <p>{introduction}</p>
        </div>
      </div>
      <Comments comments={post.comments} />
    </article>
  );
};

export default PostCard;
