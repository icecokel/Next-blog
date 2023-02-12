import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { MenuVO } from "../../../store/modules/menu";
import styles from "./EditMenu.module.scss";
import { generateRandomString } from "../../common/util/stringUtil";

const EditMenu = () => {
  const menu = useSelector((state: RootState) => state.menu);
  const blog = useSelector((state: RootState) => state.blog);
  const [menuList, setMenuList] = useState<MenuVO[]>(menu);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleClickMenuRest = () => {
    setMenuList(menu);
  };
  return (
    <article className={styles.wrapper}>
      <ul>
        {menuList.map((item, index) => {
          return (
            <li key={"menu_" + index} className={styles.menu}>
              <EditMenu.menu
                {...item}
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
        <button onClick={handleClickMenuRest}>원래대로</button>
        <button className="btn-success">저장</button>
      </div>
    </article>
  );
};

export default EditMenu;

interface IMenuProps extends MenuVO {
  handleClickUp: (index: number) => void;
  handleClickDown: (index: number) => void;
}

EditMenu.menu = ({ index, name, handleClickUp, handleClickDown }: IMenuProps) => {
  return (
    <>
      <span className={styles.index}>{index}</span>
      <p>{name}</p>
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
