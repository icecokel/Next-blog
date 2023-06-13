import { useState } from "react";
import { CommentVO } from "../../store/modules/post";
import useAuth from "../common/hooks/useAuth";
import { useRouter } from "next/router";
import { API_OPTIONS, requestApi } from "../common/service/ApiService";
import { formatDateToString } from "../common/util/DateUtil";
import style from "./Comments.module.scss";
import Alert from "@mui/material/Alert";

interface ICommentsProps {
  comments: CommentVO[];
}

const Comments = ({ comments }: ICommentsProps) => {
  return (
    <section>
      <Comments.write />
      <ul>
        {comments?.length > 0 &&
          comments.map((comment) => {
            return <Comments.comment key={comment.registDate} {...comment} />;
          })}
      </ul>
    </section>
  );
};

export default Comments;

Comments.write = () => {
  const { id } = useAuth();
  const { query, replace, reload } = useRouter();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const handleToggleMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleChangeComment = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(value);
  };

  const handleClickSave = async () => {
    if (!newComment) {
      return;
    }
    const param = {
      postId: query.id ?? "",
      comment: {
        contents: newComment,
        userId: id,
        registDate: new Date().getTime(),
      },
    };

    await requestApi({ option: API_OPTIONS.registComment, params: param });
    reload();
  };

  return (
    <>
      {id && <div onClick={handleToggleMode}>{!isEditMode ? "댓글 쓰기" : "댓글 취소"} </div>}
      {isEditMode && (
        <div>
          <p>{id}</p>
          <input type="text" value={newComment} onChange={handleChangeComment} />
          <button onClick={handleClickSave}>저장</button>
        </div>
      )}
    </>
  );
};

Comments.comment = ({ contents, registDate, userId, comments }: CommentVO) => {
  return (
    <li>
      <Alert color="info" icon={false} className={style.commentWrapper}>
        <div>
          <div>
            <span>{userId}님</span>
            <span className={style.date}>
              ({formatDateToString(new Date(registDate), "yy년LL월dd일")})
            </span>
          </div>
        </div>
        <div className={style.comment}>{contents}</div>
      </Alert>
    </li>
  );
};
