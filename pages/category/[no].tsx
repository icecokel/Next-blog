import { useRouter } from "next/router";
import Loader from "../../src/components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useEffect, useState } from "react";
import { CategoryVO } from "../../store/modules/category";
import { PostVO } from "../../src/components/PostCard";
import useAxios from "../../src/common/hooks/useAxios";
import ApiOptions from "../../src/common/ApiOptions";

const TITLE_MAX_LENGTH = 20;

const CategoryPage = () => {
  const router = useRouter();
  const categoryNo = router.query.no;
  const category = useSelector((state: RootState) => state.category);
  const [currentCategory, setCurrentCategory] = useState<CategoryVO>();
  const [postList, setPostList] = useState<Array<PostVO>>([]);
  const { isLoading, data, error } = useAxios(ApiOptions.getPostsByCategoryNo, {
    categoryNo,
  });

  useEffect(() => {
    getCurrentCategory();

    setPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryNo, currentCategory, isLoading]);

  const setPosts = () => {
    if (!data) {
      return;
    }
    const temp = (data.item.posts as Array<PostVO>).filter(
      (post) => post.categoryNo === categoryNo
    );
    setPostList(temp);
  };

  const getCurrentCategory = () => {
    const tempCurrentCategory = category.find(
      (item) => item.categoryNo === categoryNo
    );
    setCurrentCategory(tempCurrentCategory);
  };

  return (
    <div className="category-wrap">
      <h2>{currentCategory?.categoryName}</h2>
      <hr />
      <label>게시글 리스트</label>
      <Loader isLoading={isLoading}>
        <ul>
          {postList.map((post, index) => {
            const hits = !post.hits ? 0 : Number.parseInt(post.hits);

            let title = post.title;
            if (TITLE_MAX_LENGTH < post.title.length) {
              title = post.title.substring(20) + " . . .";
            }

            return (
              <li key={"post_" + index}>
                <div>
                  <span className="post-no">{post.boardNo}</span>
                  <span className="post-title">{title}</span>
                  <span className="post-hits">{hits}</span>
                </div>
                <span className="post-registDate">{post.registDate}</span>
              </li>
            );
          })}
        </ul>
      </Loader>
    </div>
  );
};

export default CategoryPage;
