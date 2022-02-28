import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Link from "next/link";
const CategoryBar = () => {
  const category = useSelector((state: RootState) => state.category);

  return (
    <ul className="category">
      {category.map((item) => {
        return (
          <Link href={"/category/" + item.categoryNo} key={item.categoryNo}>
            <a>
              <li>{item.categoryName}</li>
            </a>
          </Link>
        );
      })}
    </ul>
  );
};

export default CategoryBar;
