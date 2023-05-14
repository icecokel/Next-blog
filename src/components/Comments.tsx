import { CommentVO } from "../../store/modules/post";

interface ICommentsProps {
  comments: CommentVO[];
}

const Comments = ({ comments }: ICommentsProps) => {
  return (
    <section>
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
  return <li> {contents}</li>;
};
