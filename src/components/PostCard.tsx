import React from "react";
import Image from "next/image";

const PostCard = (props: { item: any }) => {
  const { item } = props;

  return (
    <div>
      <Image
        src={item.thumbnailPath}
        alt={item.title}
        width={300}
        height={400}
      />
      <div>
        <p>{item.title}</p>
        <div>
          <span>{item.registerDate}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
