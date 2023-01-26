import React, { MouseEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { MenuVo } from "../../../store/modules/menu";
import ErrorLabel from "../common/ErrorLabel";

const EditMenu = () => {
  const category = useSelector((state: RootState) => state.category);
  const [categoryList, setCategoryList] = useState<MenuVo[]>();

  const handleChangeItemIndex = (index: number, sign: "up" | "down") => {
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

  const handleCancelButton = () => {
    setCategoryList(category);
  };

  return (
    <article className="edit-category-wrap">
      <section></section>
      {/* //   <section>
    //     {categoryList?.map((item, index) => {
    //       return (
    //         <EditMenu.item
    //           key={"category_management_" + index}
    //           categoryNo={item.categoryNo}
    //           categoryName={item.categoryName}
    //           moveUp={() => {
    //             handleChangeItemIndex(index, "up");
    //           }}
    //           moveDown={() => {
    //             handleChangeItemIndex(index, "down");
    //           }}
    //         />
    //       );
    //     })}
    //   </section>
    //   <ErrorLabel text="저장하지 않으면 변경되지 않습니다." />
    //   <div className="button-wrap">
    //     <button onClick={handleCancelButton}>작업취소</button>
    //     <button>저장</button>
    //   </div> */}
    </article>
  );
};

export default EditMenu;

interface ICategoryProps {
  categoryNo: string;
  categoryName: string;
  moveUp: MouseEventHandler<HTMLElement>;
  moveDown: MouseEventHandler<HTMLElement>;
}

EditMenu.item = ({
  categoryNo,
  categoryName,
  moveUp: handleMoveUp,
  moveDown: handleMoveDown,
}: ICategoryProps) => {
  return (
    <div className="edit-category-item">
      <span className="edit-category-no">{categoryNo}</span>
      <span className="edit-category-name">{categoryName}</span>
      <div contextMenu="edit-category-arrow-wrap">
        <i className="material-icons" onClick={handleMoveUp}>
          expand_less
        </i>
        <i className="material-icons" onClick={handleMoveDown}>
          expand_more
        </i>
      </div>
    </div>
  );
};
