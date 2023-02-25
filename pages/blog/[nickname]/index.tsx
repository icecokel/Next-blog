import type { NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import { getItem, getMenus, scanItem } from "../../../src/common/service/DynamoService";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../src/common/hooks/useDispatchInitialization";

export async function getServerSideProps(context: any) {
  const blogs = await getItem("BLOG", {
    url: {
      S: context.query.nickname,
    },
  });

  const profiles = await getItem("USERS", { id: { S: blogs.userId } });
  const menuItems = await getMenus(blogs.id);
  const posts = await scanItem("POSTS", ["COUNT"]);

  return {
    props: {
      blog: { ...blogs, postsCount: posts.Count },
      users: profiles,
      menus: menuItems,
    },
  };
}

const BlogMainPage: NextPage<IInitializationProps> = (props) => {
  useDispatchInitialization(props);
  return <MainCt />;
};

export default BlogMainPage;
