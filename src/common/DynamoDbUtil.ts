import { DynamoDBClient, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const clientConfig = {
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
} as any;
if (process.env.NEXT_PUBLIC_AWS_S3_REGION !== "local") {
  const credentials = {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_SECRET_ACCESS_KEY ?? "",
  };
  clientConfig.credentials = credentials;
}
const client = new DynamoDBClient(clientConfig);

export const getItem = (tableName: string, key: any) => {
  return client.send(
    new GetItemCommand({
      TableName: tableName,
      Key: key,
    })
  );
};

export const unmarshallByItem = (item: any): any => {
  if (!item) {
    throw "Not Found";
  }

  if (Array.isArray(item)) {
    return item.map((value: any) => {
      return unmarshallByItem(value);
    });
  } else {
    return unmarshall(item);
  }
};

export const getCategorys = async (blogId: string) => {
  console.log(blogId);

  const categorys = await client.send(
    new QueryCommand({
      TableName: "CATEGORY",
      IndexName: "blogIdIndex",
      KeyConditionExpression: "blogId = :blogId",
      ExpressionAttributeValues: {
        ":blogId": { S: blogId },
      },
      ScanIndexForward: false,
    })
  );

  return unmarshallByItem(categorys.Items);
};
