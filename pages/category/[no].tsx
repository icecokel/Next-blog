import { useRouter } from "next/router";
import Loader from "../../src/components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useEffect, useState } from "react";
import { CategoryVO } from "../../store/modules/category";
import { PostVO } from "../../src/components/PostCard";
import useAxios from "../../src/hooks/useAxios";
import ApiOptions from "../../src/common/ApiOptions";

const CategoryPage = () => {
  const router = useRouter();
  const categoryNo = router.query.no;
  const category = useSelector((state: RootState) => state.category);
  const [currentCategory, setCurrentCategory] = useState<CategoryVO>();
  const [postList, setPostList] = useState<Array<PostVO>>([]);
  const { isLoading, data, error } = useAxios(
    ApiOptions.getPostsByCategoryNo,
    categoryNo
  );

  useEffect(() => {
    getCurrentCategory();

    setPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, isLoading]);

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
            return <li key={"post_" + index}>ㅇㅇ</li>;
          })}
        </ul>
      </Loader>
    </div>
  );
};

export default CategoryPage;
