// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../../src/common/constant/Enum";
import { getData, updateCollection } from "../../../src/common/service/FireBaseService";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    res.status(400).json({
      status: ApiStatus.NG,
    });
  }
  const params = { ...req.body };
  if (!params.faviconPath) {
    delete params.faviconPath;
  }
  try {
    await updateCollection("blog", params.nickname, params);
    const result = await getData("blog", params.nickname);

    if (!result) {
      res.status(404).json({
        status: ApiStatus.NG,
      });
    } else {
      res.status(200).json({
        status: ApiStatus.OK,
        item: {
          nickname: result.user.nickname,
          url: result.user.nickname,
          description: result.description,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: ApiStatus.NG,
    });
  }
}
