import { NextPage } from "next";
import { PostVO } from "../../../../src/common/Model";

import CategoryCt from "../../../../src/components/containers/CategoryCt";
import { CategoryVO } from "../../../../store/modules/category";

const CategoryPage: NextPage = () => {
  // TODO SSR 적용
  const category: CategoryVO = {
    blogId: "",
    id: "",
    name: "",
  };
  const postList: PostVO[] = [];
  return <CategoryCt category={category} postList={postList} />;
};

export default CategoryPage;
