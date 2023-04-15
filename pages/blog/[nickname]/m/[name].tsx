import { GetServerSideProps, NextPage } from "next";
import { PostVO } from "../../../../src/common/constant/Model";
import MenuCt from "../../../../src/components/containers/MenuCt";
import { getPosts } from "../../../api/menus/getPosts";
import { wrapper } from "../../../../store";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query: { nickname, name } }) => {
      if (!nickname || !name) {
        return {
          notfound: true,
        };
      }
      const data = await getPosts({
        name: name.toString(),
        nickname: nickname.toString(),
        startAtValue: 1,
      });
      if (!data) {
        return {
          notfound: true,
        };
      }

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
