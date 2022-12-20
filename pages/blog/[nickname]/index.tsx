import type { NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import { getItem, unmarshallByItem } from "../../../src/common/DynamoDbUtil";

export async function getServerSideProps(context: any) {
  const blogs = await getItem("BLOG", {
    name: {
      S: "leemon",
    },
  });

  return {
    props: {
      blog: unmarshallByItem(blogs.Item),
    },
  };
}

const BlogMainPage: NextPage = (props: any) => {
  console.log(props);

  return <MainCt />;
};

export default BlogMainPage;
