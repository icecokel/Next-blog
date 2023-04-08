import React, { useEffect, useRef } from "react";
import Loader from "./common/Loader";
import { PostVO } from "../common/constant/Model";
import Link from "next/link";
import { formatDateToString } from "../common/util/DateUtil";
import styles from "./MenuCp.module.scss";
import useIntersectionObserver from "../common/hooks/useIntersectionObserver";

interface ICatogoryProps {
  nickname: string | string[];
  menuName: string | string[];
  postList: PostVO[];
}

const MenuCp = ({ menuName, postList, nickname }: ICatogoryProps) => {
  const lastRef = useRef<HTMLLIElement>(null);
  const entry = useIntersectionObserver(lastRef, {});
  const isVisible = entry?.isIntersecting;

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);

  return (
    <div className={styles.wrapper}>
      <h2>{menuName}</h2>
      <hr />
      <section className={styles.menus}>
        <div className={styles.contents}>
          <label>게시글 리스트</label>
          <Loader isLoading={postList.length === 0}>
            <ul>
              {postList.map((post, index) => {
                const hits = !post.hits ? 0 : Number.parseInt(post.hits);
                const ref = postList.length === index + 1 ? lastRef : null;

                return (
                  <MenuCp.itemByPost
                    postId={post.id}
                    title={post.title}
                    hits={hits}
                    registDate={post.registDate}
                    key={"menu_" + index}
                    nickname={nickname}
                    ref={ref}
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
  ref: React.RefObject<HTMLLIElement> | null;
}

MenuCp.itemByPost = ({ postId, hits, registDate, title, nickname, ref }: IItemProps) => {
  return (
    <Link href={"/blog/" + nickname + "/p/" + postId}>
      <li ref={ref}>
        <div className={styles.postTitle}>{title}</div>
        <div>
          <span className={styles.postRegistDate}>{formatDateToString(new Date(registDate))}</span>
          <span className={styles.postHits}>{hits}</span>
        </div>
      </li>
    </Link>
  );
};
