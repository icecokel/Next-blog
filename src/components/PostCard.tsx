import React from "react";
import Image from "next/image";
import { PostVO } from "../common/Model";

const PostCard = (props: { item: PostVO }) => {
  const { item } = props;

  return (
    <div>
      <Image
        src="/resources/images/dafault.png"
        alt={item.title}
        width={300}
        height={400}
      />
      <div>
        <p>{item.title}</p>
        <div>
          <span>{item.registDate}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
