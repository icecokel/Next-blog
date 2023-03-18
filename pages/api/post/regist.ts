// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../../src/common/constant/Enum";
import { insertItem } from "../../../src/common/service/DynamoService";
import { insertData, insertDoc } from "../../../src/common/service/FireBaseService";
import { generateRandomString } from "../../../src/common/util/StringUtil";

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

  try {
    await insertData("post", id, param);
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
