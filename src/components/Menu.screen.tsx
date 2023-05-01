import { throttle } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { PostVO } from "../common/constant/Model";
import useObserver from "../common/hooks/useObserver";
import { requestApi } from "../common/service/ApiService";
import { formatDateToString } from "../common/util/DateUtil";
import styles from "./Menu.screen.module.scss";
import Loader from "./common/Loader";

interface ICatogoryProps {
  postList: PostVO[];
}

const MenuScreen = ({ postList }: ICatogoryProps) => {
  const [posts, setPosts] = useState<PostVO[]>(postList);
  const { query } = useRouter();
  const menuName = query.name ?? "";
  const nickname = query.nickname ?? "";

  const target = useObserver(
    throttle(async () => {
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
    }, 500)
  );

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
                <MenuScreen.itemByPost
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
          <div className={styles.loader} ref={target}>
            <Loader isLoading={true} size={10}>
              loading...
            </Loader>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuScreen;

interface IItemProps {
  nickname: string | string[];
  postId: string;
  title: string;
  hits: number;
  registDate: number;
}

MenuScreen.itemByPost = ({ postId, hits, registDate, title, nickname }: IItemProps) => {
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
