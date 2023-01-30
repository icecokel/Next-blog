import React from "react";
import { useRouter } from "next/router";
import { PostVO } from "../../common/Model";
import MenuCp from "../MenuCp";

interface IProp {
  postList: PostVO[];
}

const MenuCt = ({ postList }: IProp) => {
  const router = useRouter();
  const categoryName = router.query.name ?? "";
  const nickname = router.query.nickname ?? "";

  return <MenuCp categoryName={categoryName} postList={postList} nickname={nickname} />;
};

export default MenuCt;
