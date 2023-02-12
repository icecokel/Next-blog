import React from "react";
import Loader from "./common/Loader";
import { PostVO } from "../common/constant/Model";
import Link from "next/link";
import { formatDateToString } from "../common/util/DateUtil";

const TITLE_MAX_LENGTH = 20;

interface ICatogoryProps {
  nickname: string | string[];
  menuName: string | string[];
  postList: PostVO[];
}

const MenuCp = ({ menuName, postList, nickname }: ICatogoryProps) => {
  return (
    <div className="menu-wrap">
      <h2>{menuName}</h2>
      <hr />
      <section className="menu-contents-wrap">
        <div className="menu-contents">
          <label>게시글 리스트</label>
          <Loader isLoading={postList.length === 0}>
            <ul>
              {postList.map((post, index) => {
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
      <a>
        <li>
          <div>
            <span className="post-title">{title}</span>
            <span className="post-hits">{hits}</span>
          </div>
          <span className="post-registDate">{formatDateToString(new Date(registDate))}</span>
        </li>
      </a>
    </Link>
  );
};
