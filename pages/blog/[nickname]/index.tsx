import type { NextPage } from "next";
import MainCt from "../../../src/components/containers/MainCt";
import { getItem, unmarshallByItem, getCategorys } from "../../../src/common/DynamoDbUtil";

export async function getServerSideProps(context: any) {
  const blogs = await getItem("BLOG", {
    name: {
      S: "leemon",
    },
  });
  const blogItem = unmarshallByItem(blogs.Item);

  const profiles = await getItem("USERS", { id: { S: blogItem.userId } });
  const profileItem = unmarshallByItem(profiles.Item);
  const categoryItem = await getCategorys(blogItem.id);
  return {
    props: {
      blog: blogItem,
      users: profileItem,
      categorys: categoryItem,
    },
  };
}

const BlogMainPage: NextPage = (props: any) => {
  return <MainCt {...props} />;
};

export default BlogMainPage;
