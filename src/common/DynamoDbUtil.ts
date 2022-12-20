import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId:
      process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_ACCESS_KEY_ID ?? "",
    secretAccessKey:
      process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_SECRET_ACCESS_KEY ?? "",
  },
});

export const getItem = (tableName: string, key: any) => {
  return client.send(
    new GetItemCommand({
      TableName: tableName,
      Key: key,
    })
  );
};

export const unmarshallByItem = (item: any) => {
  if (!item) {
    throw "Not Found";
  }
  return unmarshall(item);
};
