import type { GetServerSideProps, NextPage } from "next";
import { PostVO } from "../../../../src/common/constant/Model";
import MenuCt from "../../../../src/components/containers/MenuCt";
import { getPosts } from "../../../api/menus/getPosts";
import { wrapper } from "../../../../store";
import { setBlog, BlogVO } from "../../../../store/modules/blog";
import { setMenu, MenuVO } from "../../../../store/modules/menu";
import { setUser, UserVO } from "../../../../store/modules/user";

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
  return <MenuCt postList={posts} />;
};

export default MenuPage;
