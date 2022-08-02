import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getPostInfo } from "../../../../src/common/ApiOptions";
import RequestUtil from "../../../../src/common/RequestUtil";
import PostCard from "../../../../src/components/PostCard";

const PostPage = ({ id }: { id: string; item: any }) => {
  const { data } = useQuery(
    ["post", id],
    async () => await RequestUtil(getPostInfo, id)
  );
  const postInfo = data?.data?.item?.posts;

  return <>{postInfo && <PostCard {...postInfo} />}</>;
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const quertClient = new QueryClient();

  quertClient.prefetchQuery(
    ["post", id],
    async () => await RequestUtil(getPostInfo, id)
  );

  return {
    props: {
      id: id,
      item: dehydrate(quertClient),
    },
  };
};
