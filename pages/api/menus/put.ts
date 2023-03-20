// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../../src/common/constant/Enum";
import { getData, updateCollection } from "../../../src/common/service/FireBaseService";
import { MenuVO } from "../../../store/modules/menu";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "PUT") {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }

  const updateMenus: MenuVO[] = req.body.menus;
  const nickname: string = req.body.nickname;

  try {
    await updateCollection("blog", nickname, { menu: updateMenus });
    const result = await getData("blog", nickname);
    if (!result) {
      res.status(404).json({
        status: ApiStatus.NG,
      });
    } else {
      res.status(200).json({
        status: ApiStatus.OK,
        items: result.menu,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: ApiStatus.NG,
    });
  }
}
