import type { NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import { getItem, unmarshallByItem, getMenus, scanItem } from "../../../src/common/DynamoDbUtil";
import { useEffect } from "react";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../src/common/hooks/useDispatchInitialization";

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
  const menuItems = await getMenus(blogItem.id);
  const posts = await scanItem("POSTS", ["COUNT"]);

  return {
    props: {
      blog: { ...blogItem, postsCount: posts.Count },
      users: profileItem,
      menus: menuItems,
    },
  };
}

const BlogMainPage: NextPage<IInitializationProps> = (props) => {
  useDispatchInitialization(props);
  return <MainCt />;
};

export default BlogMainPage;
