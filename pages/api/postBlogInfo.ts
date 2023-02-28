// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../src/common/constant/Enum";
import { updateItem } from "../../src/common/service/DynamoService";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    res.status(400).json({
      status: ApiStatus.NG,
    });
  }
  const params = req.body;
  const itemsToChange = params.faviconPath ? ["description", "faviconPath"] : ["description"];

  try {
    const requests = [
      updateItem("BLOG", "url", itemsToChange, params),
      updateItem("USERS", "id", ["nickname"], { nickname: params.nickname, id: params.userId }),
    ];
    const [blog, user] = await Promise.all(requests);

    res.status(200).json({
      status: ApiStatus.OK,
      item: { nickname: user.nickname, url: blog.url, description: blog.description },
    });
  } catch (error) {
    res.status(500).json({
      status: ApiStatus.NG,
      item: error,
    });
  }
}
