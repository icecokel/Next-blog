import type { GetServerSideProps, NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../src/common/hooks/useDispatchInitialization";
import { getData } from "../../../src/common/service/FireBaseService";
import { wrapper } from "../../../store";
import { BlogVO, setBlog } from "../../../store/modules/blog";
import { MenuVO, setMenu } from "../../../store/modules/menu";
import { setUser, UserVO } from "../../../store/modules/user";
import { ApiStatus } from "../../../src/common/constant/Enum";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
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

      store.dispatch(setBlog(blog as BlogVO));
      store.dispatch(setMenu(blog.menu as MenuVO[]));
      store.dispatch(setUser(blog.user as UserVO));

      return {
        props: {
          status: ApiStatus.OK,
        },
      };
    }
);

const BlogMainPage: NextPage<IInitializationProps> = (props) => {
  return <MainCt />;
};

export default BlogMainPage;
