import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import RequestUtil from "../../common/RequestUtil";
import { getPostsByCategoryNo } from "../../common/ApiOptions";
import { CategoryVO } from "../../../store/modules/category";
import { PostVO } from "../../common/Model";
import CategoryCp from "../CategoryCp";

const CategoryCt = () => {
  const router = useRouter();
  const categoryNo = router.query.no;
  const category = useSelector((state: RootState) => state.category);
  const [currentCategory, setCurrentCategory] = useState<CategoryVO>();
  const [postList, setPostList] = useState<PostVO[]>([]);

  useEffect(() => {
    getCurrentCategory();
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryNo, currentCategory]);

  const getPosts = async () => {
    const { data } = await RequestUtil(getPostsByCategoryNo, {
      categoryNo,
    });

    if (!data) {
      return;
    }
    const temp = (data.item.posts as PostVO[]).filter(
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
    <CategoryCp
      categoryName={currentCategory?.categoryName ?? ""}
      postList={postList}
      nickname={router.query.nickname ?? ""}
    />
  );
};

export default CategoryCt;
