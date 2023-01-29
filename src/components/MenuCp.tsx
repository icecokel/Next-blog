import React from "react";
import Loader from "./common/Loader";
import { PostVO } from "../common/Model";
import Link from "next/link";
import { formatDateToString } from "../common/DateUtil";

const TITLE_MAX_LENGTH = 20;

interface ICatogoryProps {
  nickname: string | string[];
  categoryName: string | string[];
  postList: PostVO[];
}

const MenuCp = ({ categoryName, postList, nickname }: ICatogoryProps) => {
  return (
    <div className="category-wrap">
      <h2>{categoryName}</h2>
      <hr />
      <section className="category-contents-wrap">
        <div className="category-contents">
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
                    key={"category_" + index}
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
    <Link href={"/blog/" + nickname + "/post/" + postId}>
      <a>
        <li>
          <div>
            <span className="post-no">{postId}</span>
            <span className="post-title">{title}</span>
            <span className="post-hits">{hits}</span>
          </div>
          <span className="post-registDate">{formatDateToString(new Date(registDate))}</span>
        </li>
      </a>
    </Link>
  );
};
