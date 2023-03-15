import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../../../../src/common/service/FireBaseService";
import PostCard from "../../../../src/components/containers/PostCard";
import { setBlog } from "../../../../store/modules/blog";
import { setMenu } from "../../../../store/modules/menu";
import { setUser } from "../../../../store/modules/user";

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
      user: blog.user,
      menus: blog.menu,
    },
  };
};

const PostPage = ({ blog, post, user, menus }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setRedux();
  }, []);

  const setRedux = () => {
    dispatch(setBlog(blog));
    dispatch(setMenu(menus));
    dispatch(setUser(user));
  };

  return <PostCard post={post} user={user} />;
};

export default PostPage;
