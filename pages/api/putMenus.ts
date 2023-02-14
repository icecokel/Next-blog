// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getMenus,
  insertItem,
  unmarshallByItem,
  updateItem,
} from "../../src/common/service/DynamoService";
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

  const promises = updateMenus.map(async (item) => {
    const isIncludes = isIncludesFromTargetByKey(item, menuItem, "id");
    return isIncludes
      ? updateItem("MENU", "id", ["name", "index"], item)
      : insertItem("MENU", item);
  });

  try {
    const response = await Promise.all(promises);

    res.status(200).json({
      status: "Ok",
      items: unmarshallByItem(response.map((menu) => menu.Attributes)),
    });
  } catch (error) {
    res.status(500).json({
      status: "NG",
      item: error,
    });
  }
}
