import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { getItem, unmarshallByItem } from "../../../../src/common/DynamoDbUtil";
import PostCard from "../../../../src/components/PostCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await getItem("POSTS", { id: { S: context.query.id } });

  if (!post.Item) {
    return {
      props: {
        code: 404,
      },
    };
  }

  const postItem = unmarshallByItem(post.Item);
  return {
    props: {
      post: postItem,
    },
  };
};

const PostPage = (props: any) => {
  useEffect(() => {
    if (props.code === 404) {
      window.location.replace(window.location.origin + "/404");
    }
  }, []);
  return <PostCard {...props.post} />;
};

export default PostPage;
