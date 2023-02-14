// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getMenus, insertItem, updateItem } from "../../src/common/service/DynamoService";
import { isIncludesFromTargetByKey } from "../../src/common/util/ArrayUtil";
import { MenuVO } from "../../store/modules/menu";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "PUT") {
    res.status(200).json({
      status: "400",
    });
  }

  const updateMenus: MenuVO[] = req.body.menus;
  const blogId = updateMenus[0].blogId;
  const menuItem: MenuVO[] = await getMenus(blogId);
  updateMenus.forEach(async (item) => {
    try {
      const isIncludes = isIncludesFromTargetByKey(item, menuItem, "id");
      if (isIncludes) {
        await updateItem("MENU", "id", item);
      } else {
        await insertItem("MENU", item);
      }
    } catch (error) {
      res.status(500).json({
        status: "NG",
        item: error,
      });
    }
  });

  res.status(200).json({
    status: "Ok",
  });
}
