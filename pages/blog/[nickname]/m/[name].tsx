import { GetServerSidePropsContext, NextPage } from "next";
import { PostVO } from "../../../../src/common/constant/Model";
import MenuCt from "../../../../src/components/containers/MenuCt";
import useDispatchInitialization, {
  IInitializationProps,
} from "../../../../src/common/hooks/useDispatchInitialization";
import { getPosts } from "../../../api/menus/getPosts";

export async function getServerSideProps({
  query: { nickname, name },
}: GetServerSidePropsContext<any>) {
  if (!nickname || !name) {
    return {
      notfound: true,
    };
  }
  const data = await getPosts({
    name: name.toString(),
    nickname: nickname.toString(),
    page: 1,
    rowCount: 3,
  });
  if (!data) {
    return {
      notfound: true,
    };
  }
  return {
    props: { ...data },
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
