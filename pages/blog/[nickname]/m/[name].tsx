import { NextPage } from "next";
import { PostVO } from "../../../../src/common/constant/Model";
import MenuCt from "../../../../src/components/containers/MenuCt";
import { MenuVO } from "../../../../store/modules/menu";
import { getItem, getMenus, getPosts } from "../../../../src/common/service/DynamoService";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../../src/common/hooks/useDispatchInitialization";

export async function getServerSideProps(context: any) {
  const blogs = await getItem("BLOG", {
    name: {
      S: context.query.nickname,
    },
  });

  const profiles = await getItem("USERS", { id: { S: blogs.userId } });
  const menuItems = await getMenus(blogs.id);

  const currentMenu = menuItems.find((item: MenuVO) => {
    return item.name === context.query.name;
  });

  if (!currentMenu) {
    return {
      props: {
        code: 404,
      },
    };
  }

  const posts = await getPosts(currentMenu?.id);

  return {
    props: {
      blog: blogs,
      users: profiles,
      menus: menuItems,
      posts: posts,
    },
  };
}

interface IPageProps extends IInitializationProps {
  posts: PostVO[];
}

const MenuPage: NextPage<IPageProps> = (props) => {
  useDispatchInitialization(props);

  return <MenuCt postList={props.posts} />;
};

export default MenuPage;
