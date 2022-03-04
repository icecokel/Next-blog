import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Link from "next/link";
import Loader from "../common/Loader";
const CategoryBar = () => {
  const category = useSelector((state: RootState) => state.category);
  const haveCategoryInfos = category.length !== 0;

  return (
    <ul className="category">
      <Loader isLoading={!haveCategoryInfos} size={5.5}>
        {category.map((item) => {
          return (
            <Link href={"/category/" + item.categoryNo} key={item.categoryNo}>
              <a>
                <li>{item.categoryName}</li>
              </a>
            </Link>
          );
        })}
      </Loader>
    </ul>
  );
};

export default CategoryBar;
