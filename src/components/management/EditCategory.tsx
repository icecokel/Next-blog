import React, { MouseEventHandler, useEffect, useState } from "react";
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

  const onChangeItemIndex = (index: number, sign: "up" | "down") => {
    const list = [...(categoryList ?? [])];

    switch (sign) {
      case "up":
        list.splice(index - 1, 0, list[index]);
        list.splice(index + 1, 1);
        break;
      case "down":
        list.splice(index + 2, 0, list[index]);
        list.splice(index, 1);
        break;
    }

    setCategoryList(list);
  };

  return (
    <div className="edit-category-wrap">
      {categoryList?.map((item, index) => {
        return (
          <EditCategory.item
            key={"category_management_" + index}
            categoryNo={item.categoryNo}
            categoryName={item.categoryName}
            moveUp={() => {
              onChangeItemIndex(index, "up");
            }}
            moveDown={() => {
              onChangeItemIndex(index, "down");
            }}
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
  moveUp: MouseEventHandler<HTMLElement>;
  moveDown: MouseEventHandler<HTMLElement>;
}

EditCategory.item = ({
  categoryNo,
  categoryName,
  moveUp,
  moveDown,
}: ICategoryProps) => {
  return (
    <div className="edit-category-item">
      <span className="edit-category-no">{categoryNo}</span>
      <span className="edit-category-name">{categoryName}</span>
      <div contextMenu="edit-category-arrow-wrap">
        <i className="material-icons" onClick={moveUp}>
          expand_less
        </i>
        <i className="material-icons" onClick={moveDown}>
          expand_more
        </i>
      </div>
    </div>
  );
};
