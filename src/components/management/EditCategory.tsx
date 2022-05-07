import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { CategoryVO } from "../../../store/modules/category";

const EditCategory = () => {
  const category = useSelector((state: RootState) => state.category);
  const [categoryList, setCategoryList] = useState<Array<CategoryVO>>();

  useEffect(() => {
    setCategorys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, categoryList]);

  const setCategorys = () => {
    if (categoryList) {
      return;
    }
    setCategoryList(category);
  };
  return (
    <div className="edit-category-wrap">
      {category.map((item, index) => {
        return (
          <div
            key={"category_management_" + index}
            className="edit-category-item"
          >
            <span className="edit-category-no">{item.categoryNo}</span>
            <span className="edit-category-name">{item.categoryName}</span>
            <div contextMenu="edit-category-arrow-wrap">
              <i className="material-icons">expand_less</i>
              <i className="material-icons">expand_more</i>
            </div>
          </div>
        );
      })}

      <div className="button-wrap">
        <button>작업취소</button>
        <button>저장</button>
      </div>
    </div>
  );
};

export default EditCategory;
