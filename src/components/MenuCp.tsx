import React, { useEffect, useRef, useState, useCallback } from "react";
import { PostVO } from "../common/constant/Model";
import Link from "next/link";
import { formatDateToString } from "../common/util/DateUtil";
import styles from "./MenuCp.module.scss";
import Loader from "./common/Loader";
import { requestApi } from "../common/service/ApiService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { debounce } from "lodash";

interface ICatogoryProps {
  nickname: string | string[];
  menuName: string | string[];
  postList: PostVO[];
}

const MenuCp = ({ menuName, postList, nickname }: ICatogoryProps) => {
  const [posts, setPosts] = useState<PostVO[]>(postList);
  const target = useRef<HTMLDivElement>(null);

  const fetchMoreData = debounce(async () => {
    console.log("D");
    const { data } = await requestApi({
      option: {
        method: "GET",
        url: "/menus/getPosts",
      },
      params: {
        name: menuName,
        nickname: nickname,
        startAtValue: [...posts].pop()?.registDate,
      },
    });

    setPosts([...posts, ...data.data]);

    console.log(data);
  }, 100);

  // TODO 로대쉬 추가
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        async ([e], observer) => {
          if (e.isIntersecting) {
            observer.unobserve(e.target);
            fetchMoreData();
            observer.observe(e.target);
          }
        },
        { threshold: 1 }
      );
      observer.observe(target.current as Element);
    }
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className={styles.wrapper}>
      <h2>{menuName}</h2>
      <hr />
      <section className={styles.menus}>
        <div className={styles.contents}>
          <label>게시글 리스트</label>
          <ul>
            {posts.map((post, index) => {
              const hits = !post.hits ? 0 : Number.parseInt(post.hits);
              return (
                <MenuCp.itemByPost
                  postId={post.id}
                  title={post.title}
                  hits={hits}
                  registDate={post.registDate}
                  key={"menu_" + index}
                  nickname={nickname}
                />
              );
            })}
          </ul>
          <div ref={target}>
            <Loader isLoading={true}>loading...</Loader>
          </div>
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
