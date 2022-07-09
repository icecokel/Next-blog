import React from "react";
import Image from "next/image";
import { PostVO } from "../common/Model";
import { formatDateToString } from "../common/DateUtil";

const PostCard = (props: PostVO) => {
  return (
    <div className="post-wrap">
      <div className="post-title-wrap">
        <div className="post-image-wrap">
          <Image
            src="/resources/images/dafault.png"
            alt={props.title}
            width={800}
            height={300}
          />
        </div>
        <div className="post-title">
          <p>{props.title}</p>
          <div>
            <span>
              {formatDateToString(props.registDate, "yyyy년 MM월 dd일 hh:mm")}
            </span>
          </div>
        </div>
      </div>
      <div className="post-contents-wrap">
        <div
          className="post-contents"
          dangerouslySetInnerHTML={{ __html: props.contents }}
        />
      </div>
    </div>
  );
};

export default PostCard;
