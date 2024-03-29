import Slide from "@mui/material/Slide";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import useClickOutSide from "../../common/hooks/useClickOutSide";
import { sortByKey } from "../../common/util/ArrayUtil";
import styles from "./SideBar.module.scss";
import useLoader from "../common/Loader/useLoader";

interface ISideBarProps {
  handleToggle: () => void;
}

const SideBar = ({ handleToggle }: ISideBarProps) => {
  const { nickname } = useSelector((state: RootState) => state.user);
  const menu = useSelector((state: RootState) => state.menu);
  const sortedMenu = sortByKey(menu, "index");
  const [keyword, setKeyword] = useState<string>("");
  const sideBarRef = useClickOutSide(handleToggle);
  const { open } = useLoader();

  useEffect(() => {
    const handleKeyDownEscape = ({ key }: any) => {
      if (key === "Escape") {
        handleToggle();
      }
    };
    window.addEventListener("keydown", handleKeyDownEscape, false);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEscape, false);
    };
  }, []);

  const handleChangeKeyword = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(value);
  };

  return (
    <div className={styles.wrapper}>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <div className={styles.menuList} ref={sideBarRef}>
          <div>{nickname}님의 블로그</div>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="게시글 검색"
              value={keyword}
              onChange={handleChangeKeyword}
            />
          </div>
          <ul>
            {sortedMenu.map((item) => {
              const encodedUri = `/blog/${nickname.trim()}/m/${encodeURIComponent(
                item.name.trim()
              )}`;
              return (
                <Link href={encodedUri} key={item.id} target="_parent" onClick={() => open()}>
                  <li>{item.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </Slide>
    </div>
  );
};

export default SideBar;
