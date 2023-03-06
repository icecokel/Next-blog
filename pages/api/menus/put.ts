// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../../src/common/constant/Enum";
import { getMenus, insertItem, updateItem } from "../../../src/common/service/DynamoService";
import { isIncludesFromTargetByKey } from "../../../src/common/util/ArrayUtil";
import { MenuVO } from "../../../store/modules/menu";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "PUT") {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }

  const updateMenus: MenuVO[] = req.body.menus;
  const blogId = updateMenus[0].blogId;
  const menuItem: MenuVO[] = await getMenus(blogId);

  const promises = updateMenus.map(async (item) => {
    const isIncludes = isIncludesFromTargetByKey(item, menuItem, "id");
    return isIncludes
      ? updateItem("MENU", "id", ["name", "index"], item)
      : insertItem("MENU", item);
  });

  try {
    const response = await Promise.all(promises);

    res.status(200).json({
      status: ApiStatus.OK,
      items: response,
    });
  } catch (error) {
    res.status(500).json({
      status: ApiStatus.NG,
      item: error,
    });
  }
}
