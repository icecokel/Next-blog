import React from "react";
import { useRouter } from "next/router";
import { CategoryVO } from "../../../store/modules/category";
import { PostVO } from "../../common/Model";
import CategoryCp from "../CategoryCp";

interface IProp {
  category: CategoryVO;
  postList: PostVO[];
}

const CategoryCt = ({ postList, category }: IProp) => {
  const router = useRouter();
  const categoryName = router.query.name ?? "";
  const nickname = router.query.nickname ?? "";

  return <CategoryCp categoryName={categoryName} postList={postList} nickname={nickname} />;
};

export default CategoryCt;
