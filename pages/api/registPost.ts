// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { insertItem } from "../../src/common/service/DynamoService";
import { generateRandomString } from "../../src/common/util/stringUtil";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    res.status(200).json({
      status: "400",
    });
  }

  const param = {
    ...req.body,
    hits: 0,
    id: generateRandomString(32),
  };

  const response = await insertItem("POSTS", param);

  res.status(response.$metadata.httpStatusCode ?? 500).json({
    status: "Ok",
    item: response,
  });
}
