import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItem, getMenus } from "../../../../src/common/service/DynamoService";
import PostCard from "../../../../src/components/containers/PostCard";
import { setBlog } from "../../../../store/modules/blog";
import { setMenu } from "../../../../store/modules/menu";
import { setUser } from "../../../../store/modules/user";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blog = await getItem("BLOG", {
    url: {
      S: context.query.nickname,
    },
  });

  const profile = await getItem("USERS", { id: { S: blog.userId } });
  const menuItems = await getMenus(blog.id);
  const post = await getItem("POSTS", { id: { S: context.query.id } });

  return {
    props: {
      blog: blog,
      post: post,
      user: profile,
      menus: menuItems,
    },
  };
};

const PostPage = ({ blog, post, user, menus, code }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (code === 404) {
      window.location.replace(window.location.origin + "/404");
    } else {
      setRedux();
    }
  }, []);

  const setRedux = () => {
    dispatch(setBlog(blog));
    dispatch(setMenu(menus));
    dispatch(setUser(user));
  };

  return <PostCard post={post} user={user} />;
};

export default PostPage;
