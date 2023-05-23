import type { GetServerSideProps, NextPage } from "next";
import MenuScreen from "../../../../src/components/Menu.screen";
import { wrapper } from "../../../../store";
import { BlogVO, setBlog } from "../../../../store/modules/blog";
import { MenuVO, setMenu } from "../../../../store/modules/menu";
import { PostVO } from "../../../../store/modules/post";
import { UserVO, setUser } from "../../../../store/modules/user";
import { getPosts } from "../../../api/menus/getPosts";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async ({ query: { nickname, name } }) => {
      if (!nickname || !name) {
        return {
          notFound: true,
        };
      }
      const data = await getPosts({
        name: name.toString(),
        nickname: nickname.toString(),
        startAtValue: 1,
      });

      if (!data) {
        return {
          notFound: true,
        };
      }

      dispatch(setBlog(data.blog as BlogVO));
      dispatch(setMenu(data.menus as MenuVO[]));
      dispatch(setUser(data.users as UserVO));

      return {
        props: {
          posts: data.posts,
        },
      };
    }
);

interface IPageProps {
  posts: PostVO[];
}

const MenuPage: NextPage<IPageProps> = ({ posts }) => {
  return <MenuScreen postList={posts} />;
};

export default MenuPage;
