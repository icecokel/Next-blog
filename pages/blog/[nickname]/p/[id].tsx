import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItem, unmarshallByItem, getMenus } from "../../../../src/common/service/DynamoService";
import PostCard from "../../../../src/components/PostCard";
import { setBlog } from "../../../../store/modules/blog";
import { setMenu } from "../../../../store/modules/menu";
import { setUser } from "../../../../store/modules/user";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blogs = await getItem("BLOG", {
    name: {
      S: context.query.nickname,
    },
  });

  if (!blogs.Item) {
    return {
      props: {
        code: 404,
      },
    };
  }

  const blogItem = unmarshallByItem(blogs.Item);

  const profiles = await getItem("USERS", { id: { S: blogItem.userId } });
  const profileItem = unmarshallByItem(profiles.Item);
  const menuItems = await getMenus(blogItem.id);

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
      blog: blogItem,
      post: postItem,
      user: profileItem,
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
