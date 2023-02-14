import {
  AttributeValue,
  AttributeValueUpdate,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { capitalizeFirstLetter } from "../util/StringUtil";

type tableName = "BLOG" | "USERS" | "POSTS" | "MENU";

const clientConfig = {
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_SECRET_ACCESS_KEY ?? "",
} as any;
if (process.env.NEXT_PUBLIC_AWS_S3_REGION === "local") {
  clientConfig.endpoint = process.env.NEXT_PUBLIC_AWS_S3_DYNAMODB_ENDPOINT;
}
const client = new DynamoDBClient(clientConfig);

export const getItem = (tableName: tableName, key: any) => {
  return client.send(
    new GetItemCommand({
      TableName: tableName,
      Key: key,
    })
  );
};

export const scanItem = (tableName: tableName, select: string[]) => {
  return client.send(
    new ScanCommand({
      TableName: tableName,
      Select: select.toString(),
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

export const getMenus = async (blogId: string) => {
  const menus = await client.send(
    new QueryCommand({
      TableName: "MENU",
      IndexName: "blogIdIndex",
      KeyConditionExpression: "blogId = :blogId",
      ExpressionAttributeValues: {
        ":blogId": { S: blogId },
      },
      ScanIndexForward: false,
    })
  );

  return unmarshallByItem(menus.Items);
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

export const insertItem = async (tableName: tableName, data: any) => {
  return await client.send(
    new PutItemCommand({
      TableName: tableName,
      Item: marshall(data),
    })
  );
};

export const updateItem = async (
  tableName: tableName,
  key: string,
  updateNames: string[],
  data: any
) => {
  const updateExpression = `set ${updateNames
    .map((item) => `#${item} = :new${capitalizeFirstLetter(item)}`)
    .toString()}`.replaceAll(",", ", ");

  const expressionAttributeNames = {} as any;
  Object.values(updateNames).forEach((value) => {
    expressionAttributeNames[`#${value}`] = value;
  });

  const expressionAttributeValues: Record<string, AttributeValue> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (updateNames.includes(key)) {
      expressionAttributeValues[`:new${capitalizeFirstLetter(key)}`] = marshall(value);
    }
  });

  const params = {
    TableName: tableName,
    Key: marshall({ id: data[key] }),
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  return await client.send(new UpdateItemCommand(params));
};
