import React from "react";
import Image from "next/image";
import { PostVO } from "../common/Model";
import { formatDateToString } from "../common/DateUtil";

const PostCard = (props: PostVO) => {
  return (
    <div className="post-wrap">
      <Image
        src="/resources/images/dafault.png"
        alt={props.title}
        width={300}
        height={400}
      />
      <div className="post-title">
        <p>{props.title}</p>
        <div>
          <span>
            {formatDateToString(props.registDate, "yyyy년 MM월 dd일 hh:mm")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
