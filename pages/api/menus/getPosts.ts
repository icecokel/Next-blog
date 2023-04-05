// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../../src/common/constant/Enum";
import { getData, searchData, updateCollection } from "../../../src/common/service/FireBaseService";
import { MenuVO } from "../../../store/modules/menu";

interface IGetPostsParams {
  nickname: string;
  name: string;
  startAtValue: string | number;
}

export const getPosts = async ({ name, nickname, startAtValue }: IGetPostsParams) => {
  const blog = await getData("blog", nickname.toString());

  if (!blog) {
    return undefined;
  }
  const currentMenu = blog.menu.find((item: MenuVO) => item.name === name);
  if (!currentMenu) {
    return undefined;
  }

  const posts = await searchData("post", {
    fieldPath: "menuId",
    opStr: "==",
    value: currentMenu.id,
    orderByCondition: { fieldPath: "registDate", direction: "desc" },
    startAtValue: startAtValue,
    rowCount: 3,
  });

  return {
    blog: blog,
    users: blog.user,
    menus: blog.menu,
    posts: posts,
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "GET") {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }

  const { name, nickname, startAtValue } = req.query;

  if (!name || !nickname || !startAtValue) {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }

  const respones = await getPosts({
    name: name?.toString() ?? "",
    nickname: nickname?.toString() ?? "",
    startAtValue: Number.parseInt(startAtValue?.toString() ?? "1"),
  });

  res.status(200).json({
    status: ApiStatus.OK,
    data: respones?.posts,
  });
}
