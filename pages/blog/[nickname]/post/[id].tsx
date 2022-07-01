import { useRouter } from "next/router";
import React from "react";
import { PostVO } from "../../../../src/common/Model";
import PostCard from "../../../../src/components/PostCard";

const Post = () => {
  const router = useRouter();
  const id = router.query.id;

  const getPost = () => {
    return {
      boardNo: "1",
      title: "title",
      registId: "registId",
      hits: "2",
      registDate: new Date("2022-05-21"),
    } as PostVO;
  };

  return (
    <div>
      <PostCard {...getPost()} />
    </div>
  );
};

export default Post;
