import { GetServerSidePropsContext } from "next";
import React from "react";
import useDispatchInitialization from "../../../../src/common/hooks/useDispatchInitialization";
import { getData } from "../../../../src/common/service/FireBaseService";
import PostCard from "../../../../src/components/containers/PostCard";

export const getServerSideProps = async ({
  query: { nickname, id },
}: GetServerSidePropsContext<any>) => {
  if (!nickname || !id) {
    return {
      notFound: true,
    };
  }

  const [blog, post] = await Promise.all([
    getData("blog", nickname.toString()),
    getData("post", id.toString()),
  ]);
  if (!blog || !post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: blog,
      post: post,
      users: blog.user,
      menus: blog.menu,
    },
  };
};

const PostPage = (props: any) => {
  useDispatchInitialization(props);
  return <PostCard post={props.post} user={props.users} />;
};

export default PostPage;
