import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Link from "next/link";
import Loader from "../common/Loader";
import { useRouter } from "next/router";

const MANAGEMENT_PATH = "/category/management";

const NavBar = () => {
  const router = useRouter();
  const category = useSelector((state: RootState) => state.category);
  const haveCategoryInfos = category.length !== 0;
  const navRef = useRef<HTMLUListElement>(null);
  const [width, setWidth] = useState<number>(0);
  const currentCategory = router.query.no;

  const needRendering = () => {
    return !(
      router.pathname === "/" || router.pathname.includes(MANAGEMENT_PATH)
    );
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  if (needRendering()) {
    return (
      <div className="nav-bar-wrap">
        <ul ref={navRef}>
          <Loader isLoading={!haveCategoryInfos} size={5.5}>
            {category.map((item) => {
              return (
                <NavBar.item
                  nickname={router.query.nickname ?? ""}
                  categoryNo={item.categoryNo}
                  categoryName={item.categoryName}
                  key={item.categoryNo}
                  currentCategory={currentCategory}
                />
              );
            })}
          </Loader>
        </ul>
        {width < 960 && (
          <div className="nav-bar-menu-icon">
            <i className="material-icons">menu</i>
          </div>
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default React.memo(NavBar);

interface IItemProps {
  nickname: string | string[];
  categoryNo: string;
  categoryName: string;
  currentCategory: string | string[] | undefined;
}

NavBar.item = ({
  nickname,
  categoryNo,
  categoryName,
  currentCategory,
}: IItemProps) => {
  const isCurrentCategory = currentCategory == categoryNo;
  return (
    <Link href={"/blog/" + nickname + "/category/" + categoryNo}>
      <a>
        <li
          id={"category_id_" + categoryNo}
          className={isCurrentCategory ? "selected" : ""}
        >
          {categoryName}
        </li>
      </a>
    </Link>
  );
};
