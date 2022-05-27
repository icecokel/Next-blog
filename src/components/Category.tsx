import React from "react";
import Loader from "./common/Loader";
import { PostVo } from "../common/Model";

const TITLE_MAX_LENGTH = 20;

const Category = ({
  categoryName,
  postList,
}: {
  categoryName: string;
  postList: Array<PostVo>;
}) => {
  return (
    <div className="category-wrap">
      <h2>{categoryName}</h2>
      <hr />
      <div className="category-contents-wrap">
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
                  <li key={"post_" + index}>
                    <div>
                      <span className="post-no">{post.boardNo}</span>
                      <span className="post-title">{title}</span>
                      <span className="post-hits">{hits}</span>
                    </div>
                    <span className="post-registDate">{post.registDate}</span>
                  </li>
                );
              })}
            </ul>
          </Loader>
        </div>
      </div>
    </div>
  );
};

export default Category;
