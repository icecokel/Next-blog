import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";

const CategoryBar = () => {
  const category = useSelector((state: RootState) => state.category);

  return (
    <div className="category">
      {category.map((item) => {
        return <span key={item.categoryNo}>{item.categoryName}</span>;
      })}
    </div>
  );
};

export default CategoryBar;
