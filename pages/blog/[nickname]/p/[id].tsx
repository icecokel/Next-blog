import { GetServerSideProps } from "next";
import React from "react";
import { getData } from "../../../../src/common/service/FireBaseService";
import PostCard from "../../../../src/components/containers/PostCard";
import { wrapper } from "../../../../store";
import { setBlog, BlogVO } from "../../../../store/modules/blog";
import { setMenu, MenuVO } from "../../../../store/modules/menu";
import { setUser, UserVO } from "../../../../store/modules/user";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async ({ query: { nickname, id } }) => {
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

      dispatch(setBlog(blog as BlogVO));
      dispatch(setMenu(blog.menus as MenuVO[]));
      dispatch(setUser(blog.users as UserVO));

      return {
        props: {
          post: post,
        },
      };
    }
);

const PostPage = (props: any) => {
  return <PostCard post={props.post} user={props.users} />;
};

export default PostPage;
