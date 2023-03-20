// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../../src/common/constant/Enum";
import { searchPosts } from "../../../src/common/service/DynamoService";

// TODO dynamoDb 와 Firebase에서 like 검색이 안됨을 확인. 일단 중지
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "GET") {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }

  const { keyword, id } = req.query;
  if (!keyword || !id) {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }

  try {
    const response = await searchPosts(id?.toString() ?? "", keyword?.toString() ?? "");
    res.status(200).json({
      status: ApiStatus.OK,
      items: response,
    });
  } catch (error) {
    console.log(error);
  }
}
