import { useRouter } from "next/router";
import Loader from "../../src/components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useEffect, useState } from "react";
import { CategoryVO } from "../../store/modules/category";
import { PostVO } from "../../src/components/PostCard";

const CategoryPage = () => {
  const router = useRouter();
  const categoryNo = router.query.no;
  const category = useSelector((state: RootState) => state.category);
  const [currentCategory, setCurrentCategory] = useState<CategoryVO>();
  const [postList, setPostList] = useState<Array<PostVO>>([]);

  useEffect(() => {
    getCurrentCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

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
      <Loader isLoading={postList.length === 0}>
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
