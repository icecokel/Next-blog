import { GetServerSidePropsContext, NextPage } from "next";
import { PostVO } from "../../../../src/common/constant/Model";
import MenuCt from "../../../../src/components/containers/MenuCt";
import { MenuVO } from "../../../../store/modules/menu";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../../src/common/hooks/useDispatchInitialization";
import { searchData, getData } from "../../../../src/common/service/FireBaseService";

export async function getServerSideProps({
  query: { nickname, name },
}: GetServerSidePropsContext<any>) {
  if (!nickname || !name) {
    return {
      notfound: true,
    };
  }
  const blog = await getData("blog", nickname.toString());

  if (!blog) {
    return {
      notfound: true,
    };
  }
  const currentMenu = blog.menu.find((item: MenuVO) => item.name === name);

  if (!currentMenu) {
    return {
      notfound: true,
    };
  }

  const posts = await searchData("post", {
    fieldPath: "menuId",
    opStr: "==",
    value: currentMenu.id,
  });

  return {
    props: {
      blog: blog,
      users: blog.user,
      menus: blog.menu,
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
