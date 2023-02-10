import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { MenuVO } from "../../../store/modules/menu";
import styles from "./MenuIcon.module.scss";
import Link from "next/link";
import { sortByKey } from "../../common/util/ArrayUtil";

const MenuIcon = () => {
  const user = useSelector((state: RootState) => state.user);
  const menu = useSelector((state: RootState) => state.menu);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleClickOther = ({ target: { tagName } }: any) => {
    if (tagName === "ARTICLE" || tagName === "I") {
      setOpenMenu(!openMenu);
    }
  };

  useEffect(() => {
    const handleEscape = ({ key }: any) => {
      if (key === "Escape") {
        setOpenMenu(false);
      }
    };
    window.addEventListener("keydown", handleEscape, false);
    return window.removeEventListener("keydown", handleEscape, false);
  }, []);

  return (
    <>
      <div onClick={handleClickOther}>
        <span className="material-icons">menu</span>
      </div>
      {openMenu && (
        <MenuIcon.content menu={menu} handleClick={handleClickOther} nickname={user.nickname} />
      )}
    </>
  );
};

export default React.memo(MenuIcon);

interface IMenuContentsProps {
  menu: MenuVO[];
  handleClick: (e: any) => void;
  nickname: string;
}

MenuIcon.content = ({ menu, handleClick, nickname }: IMenuContentsProps) => {
  const sortedMenu = sortByKey(menu, "index");
  return (
    <article className={styles.memuWarpper} onClick={handleClick}>
      <div className={styles.menuList}>
        <div className={styles.profile}>{nickname}님의 블로그</div>
        <ul>
          {sortedMenu.map((item) => {
            const encodedUri = `/blog/${nickname.trim()}/m/${encodeURIComponent(item.name.trim())}`;
            return (
              <Link href={encodedUri} key={item.id}>
                <a onClick={() => {}}>
                  <li>{item.name}</li>
                </a>
              </Link>
            );
          })}
        </ul>
      </div>
    </article>
  );
};
