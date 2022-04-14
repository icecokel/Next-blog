import React, { useCallback, useEffect, useRef, useState } from "react";
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

  if (
    router.query.nickname ||
    router.query.no ||
    router.pathname === MANAGEMENT_PATH
  ) {
    return (
      <div className="nav-bar-wrap">
        <ul ref={navRef}>
          <Loader isLoading={!haveCategoryInfos} size={5.5}>
            {category.map((item) => {
              return (
                <Link
                  href={"/category/" + item.categoryNo}
                  key={item.categoryNo}
                >
                  <a>
                    <li id={"category_id_" + item.categoryNo} className="item">
                      {item.categoryName}
                    </li>
                  </a>
                </Link>
              );
            })}
          </Loader>
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default React.memo(NavBar);
