import { GetServerSideProps } from "next";
import { getData } from "../../../../src/common/service/FireBaseService";
import PostCard from "../../../../src/components/PostCard";
import { wrapper } from "../../../../store";
import { BlogVO, setBlog } from "../../../../store/modules/blog";
import { MenuVO, setMenu } from "../../../../store/modules/menu";
import { PostVO } from "../../../../store/modules/post";
import { UserVO, setUser } from "../../../../store/modules/user";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async ({ query: { nickname, id } }) => {
      if (!nickname || !id) {
        return {
          notFound: true,
        };
      }

      const [blog, post] = await Promise.all([
        getData("blog", nickname.toString()),
        getData("post", id.toString()),
      ]);
      if (!blog || !post) {
        return {
          notFound: true,
        };
      }

      dispatch(setBlog(blog as BlogVO));
      dispatch(setMenu(blog.menu as MenuVO[]));
      dispatch(setUser(blog.user as UserVO));

      return {
        props: {
          post: post,
        },
      };
    }
);

interface IProps {
  post: PostVO;
}

const PostPage = ({ post }: IProps) => {
  return <PostCard post={post} />;
};

export default PostPage;
