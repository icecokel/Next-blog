import React from "react";
import Image from "next/image";
import { PostVO } from "../common/Model";

const PostCard = (props: PostVO) => {
  return (
    <div>
      <Image
        src="/resources/images/dafault.png"
        alt={props.title}
        width={300}
        height={400}
      />
      <div>
        <p>{props.title}</p>
        <div>
          <span>{props.registDate}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
