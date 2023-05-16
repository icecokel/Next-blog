import { divide } from "lodash";
import { CommentVO } from "../../store/modules/post";
import useAuth from "../common/hooks/useAuth";

interface ICommentsProps {
  comments: CommentVO[];
}
/**
 * TODO
 * 로그인 했으면, 댓글 쓰기 기능
 * 댓글 화면 추가
 */
const Comments = ({ comments }: ICommentsProps) => {
  const { id } = useAuth();

  return (
    <section>
      {id && <div>댓글 쓰기 </div>}
      <ul>
        {comments.length > 0 &&
          comments.map((comment) => {
            return <Comments.comment key={comment.registDate} {...comment} />;
          })}
      </ul>
    </section>
  );
};

export default Comments;

Comments.comment = ({ contents, registDate, userId, comments }: CommentVO) => {
  return (
    <li>
      <div>
        <div>
          {userId}({registDate})
        </div>
      </div>
      <div>{contents}</div>
    </li>
  );
};
