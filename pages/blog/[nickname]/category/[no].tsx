import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/modules";
import { useEffect, useState } from "react";
import { CategoryVO } from "../../../../store/modules/category";
import { PostVO } from "../../../../src/components/PostCard";
import RequestUtil from "../../../../src/common/RequestUtil";
import ApiOptions from "../../../../src/common/ApiOptions";
import Category from "../../../../src/components/Category";

const CategoryPage = () => {
  const router = useRouter();
  const categoryNo = router.query.no;
  const category = useSelector((state: RootState) => state.category);
  const [currentCategory, setCurrentCategory] = useState<CategoryVO>();
  const [postList, setPostList] = useState<Array<PostVO>>([]);

  useEffect(() => {
    getCurrentCategory();

    getPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryNo, currentCategory]);

  const getPosts = async () => {
    const { data } = await RequestUtil(ApiOptions.getPostsByCategoryNo, {
      categoryNo,
    });

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
    <Category
      categoryName={currentCategory?.categoryName ?? ""}
      postList={postList}
    />
  );
};

export default CategoryPage;
