import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Link from "next/link";
import Loader from "../common/Loader";
import { useRouter } from "next/router";
import SessionUtil from "../../common/SessionUtil";
import { SessionEnum } from "../../common/SessionEnum";
import { UserVO } from "../../../store/modules/user";
import CryptoUtil from "../../common/CryptoUtil";

const CategoryBar = () => {
  const router = useRouter();
  const category = useSelector((state: RootState) => state.category);
  const user = useSelector((state: RootState) => state.user);
  const [currentUser, setCurrentUser] = useState<UserVO>();
  const haveCategoryInfos = category.length !== 0;
  const navRef = useRef<HTMLUListElement>(null);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const categorySizeList = useRef<Array<number>>([]);
  const leftSize = useRef<number>(0);

  useEffect(() => {
    setCategorySizeList();
    setSessionUser();
    setManagement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, categoryIndex]);

  const setSessionUser = useCallback(() => {
    const encryptoText = SessionUtil.getSession(SessionEnum.userInfo);

    if (!encryptoText) {
      return;
    }
    const data = CryptoUtil.decrypt(encryptoText);

    setCurrentUser(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const setManagement = useCallback(() => {
    if (user.email !== currentUser?.email) {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, user]);

  const setCategorySizeList = useCallback(() => {
    const temp = new Array<number>();

    category.forEach((item) => {
      const li = document.getElementById("category_id_" + item.categoryNo);

      temp.push(li?.clientWidth ?? 0);
    });

    categorySizeList.current = temp;
  }, [category]);

  const handleMoveCategory = (side: "left" | "right") => {
    if (!navRef?.current) {
      return;
    }

    let tempLeftSize = leftSize.current;
    const spaceSize = 12;
    const currentLeftSize = navRef.current.scrollLeft;

    let index = categoryIndex;

    switch (side) {
      case "left":
        tempLeftSize =
          currentLeftSize - (categorySizeList.current[--index] + spaceSize);

        index = index < 0 ? 0 : index;

        break;

      case "right": {
        tempLeftSize =
          currentLeftSize + categorySizeList.current[index++] + spaceSize;

        index = index > category.length - 1 ? category.length - 1 : index;

        break;
      }
    }

    tempLeftSize = tempLeftSize < 0 ? 0 : tempLeftSize;

    if (leftSize.current === tempLeftSize) {
      return;
    }

    navRef.current.scrollTo({
      top: 0,
      left: tempLeftSize,
      behavior: "smooth",
    });

    leftSize.current = tempLeftSize;
    setCategoryIndex(index);
  };

  if (router.query.nickname || router.query.no) {
    return (
      <div className="nav-bar-wrap">
        <span
          className="btn-arrow"
          onClick={() => {
            handleMoveCategory("left");
          }}
          onMouseOver={() => {
            handleMoveCategory("left");
          }}
        >
          <i className="material-icons">keyboard_double_arrow_left</i>
        </span>
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

        <span
          className="btn-arrow"
          onClick={() => {
            handleMoveCategory("right");
          }}
          onMouseOver={() => {
            handleMoveCategory("right");
          }}
        >
          <i className="material-icons">keyboard_double_arrow_right</i>
        </span>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default React.memo(CategoryBar);
