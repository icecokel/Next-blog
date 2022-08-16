import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Link from "next/link";
import Loader from "../common/Loader";
import { useRouter } from "next/router";
import { CategoryVO } from "../../../store/modules/category";
import SearchIcon from "./SearchIcon";

const MANAGEMENT_PATH = "/category/management";

const MenuIcon = () => {
  const router = useRouter();
  const category = useSelector((state: RootState) => state.category);
  const haveCategoryInfos = category.length !== 0;
  const [needHideMenu, setNeedHideMenu] = useState<boolean>(false);

  const needRendering = () => {
    return !(
      router.pathname === "/" || router.pathname.includes(MANAGEMENT_PATH)
    );
  };

  const handleToggleMenu = () => {
    setNeedHideMenu(!needHideMenu);
  };

  useEffect(() => {
    const handleEscape = ({ key }: any) => {
      if (key === "Escape") {
        setNeedHideMenu(false);
      }
    };
    window.addEventListener("keydown", handleEscape, false);
    return () => window.removeEventListener("keydown", handleEscape, false);
  }, []);

  if (needRendering()) {
    return (
      <div className="nav-bar-wrap">
        {!needHideMenu ? (
          <div className="header-icon" onClick={handleToggleMenu}>
            <i className="material-icons">menu</i>
          </div>
        ) : (
          <div className="menu-wrap">
            <div className="menu">
              <div className="icon-wrap">
                <i className="material-icons">arrow_forward_ios</i>
                <span onClick={handleToggleMenu}>메뉴 접기</span>
              </div>
              <MenuIcon.menuList
                category={category}
                isLoading={haveCategoryInfos}
                nickname={router.query.nickname ?? ""}
                onClick={handleToggleMenu}
              />
              <SearchIcon />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default React.memo(MenuIcon);

interface IMenuListProps {
  category: CategoryVO[];
  isLoading: boolean;
  nickname: string[] | string;
  onClick: () => void;
}

MenuIcon.menuList = ({
  category,
  isLoading,
  nickname = "",
  onClick,
}: IMenuListProps) => {
  return (
    <ul>
      <Loader isLoading={!isLoading} size={5.5}>
        {category.map((item) => {
          return (
            <Link
              href={"/blog/" + nickname + "/category/" + item.categoryNo}
              key={item.categoryNo}
            >
              <a onClick={onClick}>
                <li id={"category_id_" + item.categoryNo}>
                  {item.categoryName}
                </li>
              </a>
            </Link>
          );
        })}
      </Loader>
    </ul>
  );
};
