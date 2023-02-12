import styles from "./MainCp.module.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { BlogVO } from "../../store/modules/blog";
import LinkIcons from "./LinkIcons";

type tabType = "posts" | "inst";

const MainCp = () => {
  const user = useSelector((state: RootState) => state.user);
  const blog = useSelector((state: RootState) => state.blog);
  const [tab, setTab] = useState<tabType>("posts");

  const handleClickTab: React.MouseEventHandler<HTMLLIElement> = ({ currentTarget: { id } }) => {
    setTab(id as tabType);
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
      <section className={styles.tabs}>
        <ul>
          <li
            className={tab === "posts" ? styles.activedTab : ""}
            id={"posts"}
            onClick={handleClickTab}
          >
            글
          </li>
          <li
            className={tab === "inst" ? styles.activedTab : ""}
            id={"inst"}
            onClick={handleClickTab}
          >
            소개
          </li>
        </ul>
      </section>
      {tab === "posts" ? <MainCp.posts blog={blog} /> : <MainCp.inst {...blog} />}
    </article>
  );
};

export default MainCp;

interface IPostsProps {
  blog: BlogVO;
}

MainCp.posts = ({ blog }: IPostsProps) => {
  return (
    <section className={styles.recentList}>
      <div>
        <h3>전체 게시글 ( {blog.postsCount} )</h3>
      </div>
    </section>
  );
};

MainCp.inst = ({ description, githubAddress }: BlogVO) => {
  return (
    <article className={styles.blogInfo}>
      <h3>소개</h3>
      <div>
        <p>{description}</p>
      </div>
      <LinkIcons githubAddress={githubAddress} />
    </article>
  );
};
