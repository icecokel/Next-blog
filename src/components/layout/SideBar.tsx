import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { sortByKey } from "../../common/util/ArrayUtil";
import styles from "./SideBar.module.scss";
import Link from "next/link";
import { ApiStatus } from "../../common/constant/Enum";
import { API_OPTIONS, requestApi } from "../../common/service/ApiService";

const OUT_SIDE_TAG_ID = "outSide";

interface ISideBarProps {
  handleToggle: () => void;
}

const SideBar = ({ handleToggle }: ISideBarProps) => {
  const { nickname, id } = useSelector((state: RootState) => state.user);
  const menu = useSelector((state: RootState) => state.menu);
  const sortedMenu = sortByKey(menu, "index");
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    const handleKeyDownEscape = ({ key }: any) => {
      if (key === "Escape") {
        handleToggle();
      }
    };
    const handleClickOutSide = ({ srcElement: { id } }: any) => {
      if (id === OUT_SIDE_TAG_ID) {
        handleToggle();
      }
    };
    window.addEventListener("keydown", handleKeyDownEscape, false);
    window.addEventListener("click", handleClickOutSide, false);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEscape, false);
      window.removeEventListener("click", handleClickOutSide, false);
    };
  }, []);

  const handleChangeKeyword = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(value);
  };

  const handleSearch = async () => {
    const { data } = await requestApi({
      option: API_OPTIONS.searchPost,
      params: {
        keyword: keyword,
        id: id,
      },
    });

    if (data.status !== ApiStatus.OK) {
      return;
    }

    console.log(data);
  };

  return (
    <div className={styles.wrapper} id={OUT_SIDE_TAG_ID}>
      <div className={styles.menuList}>
        <div>{nickname}님의 블로그</div>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="게시글 검색"
            value={keyword}
            onChange={handleChangeKeyword}
          />
          <span className="material-icons" onClick={handleSearch}>
            search
          </span>
        </div>
        <ul>
          {sortedMenu.map((item) => {
            const encodedUri = `/blog/${nickname.trim()}/m/${encodeURIComponent(item.name.trim())}`;
            return (
              <Link href={encodedUri} key={item.id}>
                <li>{item.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
