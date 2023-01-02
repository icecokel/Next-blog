import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { CategoryVO } from "../../../store/modules/category";
import styles from "./MenuIcon.module.scss";
import Link from "next/link";

const MenuIcon = () => {
  const user = useSelector((state: RootState) => state.user);
  const category = useSelector((state: RootState) => state.category);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleToggle = ({ target: { tagName } }: any) => {
    if (tagName === "ARTICLE" || tagName === "I") {
      setOpenMenu(!openMenu);
    }
  };

  return (
    <>
      <div onClick={handleToggle}>
        <i className="material-icons">menu</i>
      </div>
      {openMenu && (
        <MenuIcon.content category={category} handleClick={handleToggle} nickname={user.nickname} />
      )}
    </>
  );
};

export default React.memo(MenuIcon);

interface IMenuContentsProps {
  category: CategoryVO[];
  handleClick: (e: any) => void;
  nickname: string;
}

MenuIcon.content = ({ category, handleClick, nickname }: IMenuContentsProps) => {
  return (
    <article className={styles.memuWarpper} onClick={handleClick}>
      <div className={styles.menuList}>
        <div className={styles.profile}>{nickname}님의 블로그</div>
        <ul>
          {category.map((item) => {
            const linkUrl = `/blog/${nickname.trim()}/category/${item.name.trim()}`;
            return (
              <Link href={linkUrl} key={item.id}>
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
