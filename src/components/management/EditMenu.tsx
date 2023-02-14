import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { MenuVO } from "../../../store/modules/menu";
import styles from "./EditMenu.module.scss";
import { generateRandomString } from "../../common/util/StringUtil";
import axios from "axios";
import { sortByKey } from "../../common/util/ArrayUtil";

const EditMenu = () => {
  const menu = useSelector((state: RootState) => state.menu);
  const blog = useSelector((state: RootState) => state.blog);
  const [menuList, setMenuList] = useState<MenuVO[]>(menu);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeMenuName = ({ target: { id, value } }: React.ChangeEvent<HTMLInputElement>) => {
    const menuToUpdate = menuList.find((item) => item.id === id);
    if (!menuToUpdate) {
      return;
    }
    const updatedList = menuList.filter((item) => item.id !== id);
    updatedList.push({ ...menuToUpdate, name: value });
    const sortedList = sortByKey(updatedList, "index");
    setMenuList(sortedList);
  };
  const handleClickUp = (index: number) => {};
  const handleClickDown = (index: number) => {};

  const handleClickAddMenu = () => {
    if (!inputRef.current) {
      return;
    }
    const lastIndex = menuList.reduce((acc, currentValue) => {
      return acc < currentValue.index ? currentValue.index : acc;
    }, 0);

    const newMenu: MenuVO = {
      blogId: blog.id,
      id: generateRandomString(32),
      name: inputRef.current.value,
      index: lastIndex + 1,
    };
    setMenuList([...menuList, newMenu]);
    inputRef.current.value = "";
  };

  const handleClickMenuReset = () => {
    setMenuList(menu);
  };
  const handleClickSaveMenus = async () => {
    await axios.put("/api/putMenus", { menus: menuList });
  };
  return (
    <article className={styles.wrapper}>
      <ul>
        {menuList.map((item, index) => {
          return (
            <li key={"menu_" + index} className={styles.menu}>
              <EditMenu.menu
                {...item}
                handleChangeMenuName={handleChangeMenuName}
                handleClickUp={handleClickUp}
                handleClickDown={handleClickDown}
              />
            </li>
          );
        })}
        <li className={styles.addMenu}>
          <input type="text" placeholder="추가할 메뉴 명을 입력해주세요." ref={inputRef} />
          <button onClick={handleClickAddMenu}>추가</button>
        </li>
      </ul>
      <div className={styles.buttonWrapper}>
        <button onClick={handleClickMenuReset}>원래대로</button>
        <button onClick={handleClickSaveMenus} className="btn-success">
          저장
        </button>
      </div>
    </article>
  );
};

export default EditMenu;

interface IMenuProps extends MenuVO {
  handleChangeMenuName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickUp: (index: number) => void;
  handleClickDown: (index: number) => void;
}

EditMenu.menu = ({
  id,
  index,
  name,
  handleClickUp,
  handleClickDown,
  handleChangeMenuName,
}: IMenuProps) => {
  return (
    <>
      <span className={styles.index}>{index}</span>
      <input
        id={id}
        className={styles.name}
        type="text"
        value={name}
        onChange={handleChangeMenuName}
      />
      <div className={styles.arrows}>
        <span className="material-icons" onClick={() => handleClickUp(index)}>
          keyboard_arrow_up
        </span>
        <span className="material-icons" onClick={() => handleClickDown(index)}>
          keyboard_arrow_down
        </span>
      </div>
    </>
  );
};
