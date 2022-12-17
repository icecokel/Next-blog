// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const REGION = "ap-northeast-2";

const client = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: "AKIARKT7E4LVZX6Z6RUJ",
    secretAccessKey: "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",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await client.send(
    new GetItemCommand({
      TableName: "USERS",
      Key: {
        id: {
          S: "o7co1WlIUpTB2vHADT9V3e6e03NtsJzl",
        },
        email: {
          S: "red9runge@gmail.com",
        },
      },
    })
  );

  return res.status(200).json(response.Item);
}
