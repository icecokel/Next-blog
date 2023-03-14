import type { GetServerSidePropsContext, NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../src/common/hooks/useDispatchInitialization";
import { searchData } from "../../../src/common/service/FireBaseService";
import { FirebaseResponseVO } from "../../../src/common/constant/Model";

export async function getServerSideProps({ query: { nickname } }: GetServerSidePropsContext<any>) {
  if (!nickname) {
    return {
      notFound: true,
    };
  }
  const response: FirebaseResponseVO[] = await searchData("blog", {
    fieldPath: "url",
    opStr: "==",
    value: nickname?.toString(),
  });

  return {
    props: {
      blog: response[0],
      users: response[0].user,
      menus: response[0].menu,
    },
  };
}

const BlogMainPage: NextPage<IInitializationProps> = (props) => {
  useDispatchInitialization(props);
  return <MainCt />;
};

export default BlogMainPage;
