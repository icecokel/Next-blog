import type { GetServerSidePropsContext, NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../src/common/hooks/useDispatchInitialization";
import { getData } from "../../../src/common/service/FireBaseService";

export async function getServerSideProps({ query: { nickname } }: GetServerSidePropsContext<any>) {
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
  return {
    props: {
      blog: blog,
      users: blog.user,
      menus: blog.menu,
    },
  };
}

const BlogMainPage: NextPage<IInitializationProps> = (props) => {
  useDispatchInitialization(props);
  return <MainCt />;
};

export default BlogMainPage;
