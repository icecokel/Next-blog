import React from "react";
import Image from "next/image";
import { PostVO } from "../common/Model";
import { formatDateToString } from "../common/DateUtil";
import styles from "./PostCard.module.scss";

const PostCard = (props: PostVO) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.titleWarpper}>
        <div className={styles.imageWarpper}>
          <Image
            src="/resources/images/dafault.png"
            alt={props.title}
            width={800}
            height={300}
          />
        </div>
        <div className={styles.postTitle}>
          <p>{props.title}</p>
          <div>
            <span>
              {formatDateToString(props.registDate, "yyyy년 MM월 dd일 hh:mm")}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.contentsWrapper}>
        <div
          className={styles.contents}
          dangerouslySetInnerHTML={{ __html: props.contents }}
        />
      </div>
    </article>
  );
};

export default PostCard;
