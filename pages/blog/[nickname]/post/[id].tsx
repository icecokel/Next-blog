import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import ApiOptions from "../../../../src/common/ApiOptions";
import RequestUtil from "../../../../src/common/RequestUtil";
import PostCard from "../../../../src/components/PostCard";

const Post = ({ id, item }: { id: string; item: any }) => {
  const { data } = useQuery(
    ["post", id],
    async () => await RequestUtil(ApiOptions.getPostInfo, id)
  );
  const postInfo = data?.data?.item?.posts;
  return <div>{item && <PostCard {...postInfo} />}</div>;
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const quertClient = new QueryClient();

  quertClient.prefetchQuery(
    ["post", id],
    async () => await RequestUtil(ApiOptions.getPostInfo, id)
  );

  return {
    props: {
      id: id,
      item: dehydrate(quertClient),
    },
  };
};
