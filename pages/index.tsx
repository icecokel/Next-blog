import type { NextPage } from "next";
import PostCard from "../src/components/postCard";
import styles from "../styles/Home.module.scss";

const item = {
  title: "제목",
  hits: 11,
  registerDate: "2022/01/22",
  thumbnailPath: "/resources/images/test.jpg",
};

const Home: NextPage = () => {
  return (
    <div>
      <div className={"thumbnail"}></div>

      <div>
        <h1>TEST</h1>

        <PostCard item={item}></PostCard>
      </div>
    </div>
  );
};

export default Home;
