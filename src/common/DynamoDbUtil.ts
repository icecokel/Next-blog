import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId:
      process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_ACCESS_KEY_ID ?? "",
    secretAccessKey:
      process.env.NEXT_PUBLIC_AWS_S3_CREDENTTIALS_SECRET_ACCESS_KEY ?? "",
  },
});

export default client;
