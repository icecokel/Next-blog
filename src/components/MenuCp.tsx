import React from "react";
import Loader from "./common/Loader";
import { PostVO } from "../common/constant/Model";
import Link from "next/link";
import { formatDateToString } from "../common/util/DateUtil";
import { sortByKey } from "../common/util/ArrayUtil";
import styles from "./MenuCp.module.scss";

const TITLE_MAX_LENGTH = 20;

interface ICatogoryProps {
  nickname: string | string[];
  menuName: string | string[];
  postList: PostVO[];
}

const MenuCp = ({ menuName, postList, nickname }: ICatogoryProps) => {
  const filteredPostsByDate = postList.filter((post) => post.registDate <= Date.now());
  const sortedPosts = sortByKey(filteredPostsByDate, "registDate", "DESC");
  return (
    <div className={styles.wrapper}>
      <h2>{menuName}</h2>
      <hr />
      <section className={styles.menus}>
        <div className={styles.contents}>
          <label>게시글 리스트</label>
          <Loader isLoading={postList.length === 0}>
            <ul>
              {sortedPosts.map((post, index) => {
                const hits = !post.hits ? 0 : Number.parseInt(post.hits);

                let title = post.title;
                if (TITLE_MAX_LENGTH < post.title.length) {
                  title = post.title.substring(20) + " . . .";
                }

                return (
                  <MenuCp.itemByPost
                    postId={post.id}
                    title={title}
                    hits={hits}
                    registDate={post.registDate}
                    key={"menu_" + index}
                    nickname={nickname}
                  />
                );
              })}
            </ul>
          </Loader>
        </div>
      </section>
    </div>
  );
};

export default MenuCp;

interface IItemProps {
  nickname: string | string[];
  postId: string;
  title: string;
  hits: number;
  registDate: number;
}

MenuCp.itemByPost = ({ postId, hits, registDate, title, nickname }: IItemProps) => {
  return (
    <Link href={"/blog/" + nickname + "/p/" + postId}>
      <li>
        <div className={styles.postTitle}>{title}</div>
        <div>
          <span className={styles.postRegistDate}>{formatDateToString(new Date(registDate))}</span>
          <span className={styles.postHits}>{hits}</span>
        </div>
      </li>
    </Link>
  );
};
