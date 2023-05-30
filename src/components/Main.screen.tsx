import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { BlogVO } from "../../store/modules/blog";
import LinkIcons from "./LinkIcons";
import styles from "./Main.screen.module.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Fade from "@mui/material/Fade";

type tabType = "posts" | "inst";

const MainScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const blog = useSelector((state: RootState) => state.blog);
  const [tab, setTab] = useState<tabType>("posts");

  const handleChange = (event: React.SyntheticEvent, newValue: tabType) => {
    setTab(newValue);
  };

  return (
    <article className={styles.mainWrap}>
      <div>
        <h2>프로필</h2>
        <div className={styles.profile}>
          <img className={styles.profileImg} src={user.profileImgPath} alt="profileImg" />
          <div className={styles.profileDetail}>
            <p>
              <label>닉네임 </label>
              <span>{user.nickname}</span>
            </p>
            <p>
              <label>email </label>
              <span>{user.email}</span>
            </p>
            <p>{user.introduction}</p>
          </div>
        </div>
      </div>

      <Box className={styles.tabs}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab value={"posts"} label="글" />
          <Tab value={"inst"} label="소개" />
        </Tabs>
      </Box>
      {tab === "posts" ? <MainScreen.posts blog={blog} /> : <MainScreen.inst {...blog} />}
    </article>
  );
};

export default MainScreen;

interface IPostsProps {
  blog: BlogVO;
}

MainScreen.posts = ({ blog }: IPostsProps) => {
  return (
    <Fade in={true}>
      <section className={styles.recentList}>
        <div>
          <h3>전체 게시글 ( {blog.postsCount} )</h3>
        </div>
      </section>
    </Fade>
  );
};

MainScreen.inst = ({ description, githubAddress }: BlogVO) => {
  return (
    <Fade in={true}>
      <article className={styles.blogInfo}>
        <h3>소개</h3>
        <div>
          <p>{description}</p>
        </div>
        <LinkIcons githubAddress={githubAddress} />
      </article>
    </Fade>
  );
};
