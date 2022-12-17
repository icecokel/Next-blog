// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
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
