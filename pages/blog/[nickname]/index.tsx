import type { NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import dbClient from "../../../src/common/DynamoDbUtil";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

export async function getServerSideProps(context: any) {
  const response = await dbClient.send(
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

  return {
    props: {
      data: response.Item,
    },
  };
}

const BlogMainPage: NextPage = (props: any) => {
  console.log(props);

  return <MainCt />;
};

export default BlogMainPage;
