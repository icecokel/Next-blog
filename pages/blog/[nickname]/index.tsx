import { ApiStatus } from "../../../src/common/constant/Enum";
import { getData } from "../../../src/common/service/FireBaseService";
import MainScreen from "../../../src/components/Main.screen";
import { wrapper } from "../../../store";
import { BlogVO, setBlog } from "../../../store/modules/blog";
import { MenuVO, setMenu } from "../../../store/modules/menu";
import { UserVO, setUser } from "../../../store/modules/user";
import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async ({ query: { nickname } }) => {
      if (!nickname) {
        return {
          notFound: true,
        };
      }
      const blog = await getData("blog", nickname.toString());

      if (!blog) {
        return {
          notFound: true,
        };
      }

      dispatch(setBlog(blog as BlogVO));
      dispatch(setMenu(blog.menu as MenuVO[]));
      dispatch(setUser(blog.user as UserVO));

      return {
        props: {
          status: ApiStatus.OK,
        },
      };
    }
);

const BlogMainPage: NextPage<any> = (props) => {
  return <MainScreen />;
};

export default BlogMainPage;
