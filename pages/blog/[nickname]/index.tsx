import type { NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import {
  getItem,
  unmarshallByItem,
  getCategorys,
  scanItem,
} from "../../../src/common/DynamoDbUtil";
import { useEffect } from "react";

export async function getServerSideProps(context: any) {
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
  const categoryItems = await getCategorys(blogItem.id);
  const posts = await scanItem("POSTS");

  return {
    props: {
      blog: { ...blogItem, postsCount: posts.Count },
      users: profileItem,
      categorys: categoryItems,
    },
  };
}

const BlogMainPage: NextPage = (props: any) => {
  useEffect(() => {
    if (props.code === 404) {
      window.location.replace(window.location.origin + "/404");
    }
  }, []);
  return <MainCt {...props} />;
};

export default BlogMainPage;
