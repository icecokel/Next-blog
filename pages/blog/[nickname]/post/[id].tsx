import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ApiOptions from "../../../../src/common/ApiOptions";
import { PostVO } from "../../../../src/common/Model";
import RequestUtil from "../../../../src/common/RequestUtil";
import Loader from "../../../../src/components/common/Loader";
import PostCard from "../../../../src/components/PostCard";

const Post = () => {
  const [postInfo, setPostInfo] = useState<PostVO>();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getPost = async () => {
    const {
      data: { item },
    } = await RequestUtil(ApiOptions.getPostInfo, id);
    setPostInfo({
      ...item.posts,
      registDate: new Date(item.posts.registDate),
    });
  };

  return (
    <div>
      <Loader isLoading={!postInfo}>
        {postInfo && <PostCard {...postInfo} />}
      </Loader>
    </div>
  );
};

export default Post;
