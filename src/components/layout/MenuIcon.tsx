import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Link from "next/link";
import { CategoryVO } from "../../../store/modules/category";
import styles from "./MenuIcon.module.scss";

const MenuIcon = () => {
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
        <MenuIcon.content category={category} handleClick={handleToggle} />
      )}
    </>
  );
};

export default React.memo(MenuIcon);

interface IMenuContentsProps {
  category: CategoryVO[];
  handleClick: (e: any) => void;
}

MenuIcon.content = ({ category, handleClick }: IMenuContentsProps) => {
  return (
    <article className={styles.memuWarpper} onClick={handleClick}>
      <div className={styles.menuList}>
        <div className={styles.profile}>Solo님의 블로그</div>
        <ul>
          {category.map((item) => {
            return (
              <Link
                href={"/blog/" + "solo" + " / category / " + item.categoryNo}
                key={item.categoryNo}
              >
                <a onClick={() => {}}>
                  <li id={"category_id_" + item.categoryNo}>
                    {item.categoryName}
                  </li>
                </a>
              </Link>
            );
          })}
        </ul>
      </div>
    </article>
  );
};
