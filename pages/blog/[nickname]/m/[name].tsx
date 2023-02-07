import { NextPage } from "next";
import { PostVO } from "../../../../src/common/Model";
import MenuCt from "../../../../src/components/containers/MenuCt";
import { MenuVO } from "../../../../store/modules/menu";
import { getItem, unmarshallByItem, getMenus, getPosts } from "../../../../src/common/DynamoDbUtil";
import { useEffect } from "react";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../../src/common/hooks/useDispatchInitialization";

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
      blog: blogItem,
      users: profileItem,
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
