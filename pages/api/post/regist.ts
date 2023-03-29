// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../../src/common/constant/Enum";
import {
  getData,
  insertCollection,
  updateCollection,
} from "../../../src/common/service/FireBaseService";
import { generateRandomString } from "../../../src/common/util/StringUtil";
import { MenuVO } from "../../../store/modules/menu";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }
  const id = generateRandomString(32);
  const param = {
    ...req.body,
    hits: 0,
    id: id,
  };

  const blog = await getData("blog", param.nickname);
  if (!blog) {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  } else {
    const updateToMenu: MenuVO[] = blog.menu.map((item: MenuVO) => {
      if (item.id === param.menuId) {
        return {
          ...item,
          count: item.count + 1,
        };
      }
      return item;
    });

    try {
      await Promise.all([
        await insertCollection("post", id, param),
        await updateCollection("blog", param.nickname, { ...blog, menu: updateToMenu }),
      ]);
      res.status(200).json({
        status: ApiStatus.OK,
      });
    } catch (error) {
      res.status(200).json({
        status: ApiStatus.NG,
        error: error,
      });
    }
  }
}
