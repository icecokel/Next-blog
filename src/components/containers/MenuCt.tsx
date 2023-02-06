import React from "react";
import { useRouter } from "next/router";
import { PostVO } from "../../common/Model";
import MenuCp from "../MenuCp";

interface IProp {
  postList: PostVO[];
}

const MenuCt = ({ postList }: IProp) => {
  const router = useRouter();
  const menuName = router.query.name ?? "";
  const nickname = router.query.nickname ?? "";

  return <MenuCp menuName={menuName} postList={postList} nickname={nickname} />;
};

export default MenuCt;
