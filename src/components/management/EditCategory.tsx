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
          <EditCategory.item
            key={"category_management_" + index}
            categoryNo={item.categoryNo}
            categoryName={item.categoryName}
          />
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

interface ICategoryProps {
  categoryNo: string;
  categoryName: string;
}

EditCategory.item = ({ categoryNo, categoryName }: ICategoryProps) => {
  return (
    <div className="edit-category-item">
      <span className="edit-category-no">{categoryNo}</span>
      <span className="edit-category-name">{categoryName}</span>
      <div contextMenu="edit-category-arrow-wrap">
        <i className="material-icons">expand_less</i>
        <i className="material-icons">expand_more</i>
      </div>
    </div>
  );
};
