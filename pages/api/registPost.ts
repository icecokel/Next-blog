// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../src/common/constant/Enum";
import { insertItem } from "../../src/common/service/DynamoService";
import { generateRandomString } from "../../src/common/util/StringUtil";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }

  const param = {
    ...req.body,
    hits: 0,
    id: generateRandomString(32),
  };

  const response = await insertItem("POSTS", param);

  res.status(response.$metadata.httpStatusCode ?? 500).json({
    status: ApiStatus.OK,
    item: response,
  });
}
