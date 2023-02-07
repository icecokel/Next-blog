import React, { MouseEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { MenuVO } from "../../../store/modules/menu";
import ErrorLabel from "../common/ErrorLabel";

const EditMenu = () => {
  const menu = useSelector((state: RootState) => state.menu);
  const [menuList, setMenuList] = useState<MenuVO[]>();

  const handleChangeItemIndex = (index: number, sign: "up" | "down") => {
    const list = [...(menuList ?? [])];

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

    setMenuList(list);
  };

  const handleCancelButton = () => {
    setMenuList(menu);
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
  menuNo: string;
  menuName: string;
  moveUp: MouseEventHandler<HTMLElement>;
  moveDown: MouseEventHandler<HTMLElement>;
}

EditMenu.item = ({
  menuNo,
  menuName,
  moveUp: handleMoveUp,
  moveDown: handleMoveDown,
}: ICategoryProps) => {
  return (
    <div className="edit-menu-item">
      <span className="edit-menu-no">{menuNo}</span>
      <span className="edit-menu-name">{menuName}</span>
      <div contextMenu="edit-menu-arrow-wrap">
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
