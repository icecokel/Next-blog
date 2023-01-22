import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const clientConfig = {
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_SECRET_ACCESS_KEY ?? "",
} as any;
if (process.env.NEXT_PUBLIC_AWS_S3_REGION === "local") {
  clientConfig.endpoint = process.env.NEXT_PUBLIC_AWS_S3_DYNAMODB_ENDPOINT;
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

export const scanItem = (tableName: string) => {
  return client.send(
    new ScanCommand({
      TableName: tableName,
      Select: "COUNT",
    })
  );
};

export const unmarshallByItem = (item: any): any => {
  if (!item) {
    return {};
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

export const getPosts = async (menuId: string) => {
  const posts = await client.send(
    new QueryCommand({
      TableName: "POSTS",
      IndexName: "menuIdIndex",
      KeyConditionExpression: "menuId = :menuId",
      ExpressionAttributeValues: {
        ":menuId": { S: menuId },
      },
      ScanIndexForward: false,
    })
  );

  return unmarshallByItem(posts.Items);
};
