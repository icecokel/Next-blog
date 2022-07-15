import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ApiOptions from "../../../../src/common/ApiOptions";
import { PostVO } from "../../../../src/common/Model";
import RequestUtil from "../../../../src/common/RequestUtil";
import Loader from "../../../../src/components/common/Loader";
import PostCard from "../../../../src/components/PostCard";

const Post = ({ item }: { item: PostVO }) => {
  return (
    <div>
      <Loader isLoading={!item}>{item && <PostCard {...item} />}</Loader>
    </div>
  );
};

export default Post;

export async function getServerSideProps(context: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const id = router.query.id;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery<any>(
    ["post", id],
    async () => await RequestUtil(ApiOptions.getPostInfo, id)
  );

  return {
    props: {
      item: data,
    },
  };
}
