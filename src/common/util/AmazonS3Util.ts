import { async } from "@firebase/util";
import ReactS3Client from "react-aws-s3-typescript";

const {
  NEXT_PUBLIC_AWS_S3_REGION,
  NEXT_PUBLIC_AWS_S3_BUCKET,
  NEXT_PUBLIC_AWS_S3_DIRECTORY,
  NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
} = process.env;

export const s3Config = {
  region: NEXT_PUBLIC_AWS_S3_REGION ?? "",
  bucketName: NEXT_PUBLIC_AWS_S3_BUCKET ?? "",
  dirName: NEXT_PUBLIC_AWS_S3_DIRECTORY ?? "",
  accessKeyId: NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? "",
  secretAccessKey: NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
};

//icecokel-blog-dev/images/

const s3 = new ReactS3Client(s3Config);

const putObject = async () => {};

const getObject = () => {};

export { putObject, getObject };
