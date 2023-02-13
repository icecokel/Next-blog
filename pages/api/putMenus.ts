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

  updateMenus.forEach((item) => {
    const isIncludes = isIncludesFromTargetByKey(item, menuItem, "id");
    if (isIncludes) {
      // 수정
    } else {
      console.log(item);
      // 추가
    }
  });

  //   const response = await putData("MENU", param);

  // res.status(response.$metadata.httpStatusCode ?? 500).json({
  //   status: "Ok",
  //   item: response,
  // });
}
