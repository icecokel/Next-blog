import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { MenuVo } from "../../../store/modules/menu";
import styles from "./MenuIcon.module.scss";
import Link from "next/link";

const MenuIcon = () => {
  const user = useSelector((state: RootState) => state.user);
  const menu = useSelector((state: RootState) => state.menu);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleToggle = ({ target: { tagName } }: any) => {
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
    return () => window.removeEventListener("keydown", handleEscape, false);
  }, []);

  return (
    <>
      <div onClick={handleToggle}>
        <i className="material-icons">menu</i>
      </div>
      {openMenu && (
        <MenuIcon.content menu={menu} handleClick={handleToggle} nickname={user.nickname} />
      )}
    </>
  );
};

export default React.memo(MenuIcon);

interface IMenuContentsProps {
  menu: MenuVo[];
  handleClick: (e: any) => void;
  nickname: string;
}

MenuIcon.content = ({ menu, handleClick, nickname }: IMenuContentsProps) => {
  return (
    <article className={styles.memuWarpper} onClick={handleClick}>
      <div className={styles.menuList}>
        <div className={styles.profile}>{nickname}님의 블로그</div>
        <ul>
          {menu.map((item) => {
            const encodedUri = `/blog/${nickname.trim()}/m/${encodeURIComponent(item.name.trim())}`;
            return (
              <Link href={encodedUri} key={item.id}>
                <a onClick={() => {}}>
                  <li id={"category_id_" + item.name}>{item.name}</li>
                </a>
              </Link>
            );
          })}
        </ul>
      </div>
    </article>
  );
};
