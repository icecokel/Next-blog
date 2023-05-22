import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { MenuVO, setMenu } from "../../../store/modules/menu";
import { ApiStatus } from "../../common/constant/Enum";
import { API_OPTIONS, requestApi } from "../../common/service/ApiService";
import { sortByKey } from "../../common/util/ArrayUtil";
import { generateRandomString } from "../../common/util/StringUtil";
import styles from "./EditMenu.module.scss";

const EditMenu = () => {
  const menu = useSelector((state: RootState) => state.menu);
  const blog = useSelector((state: RootState) => state.blog);
  const user = useSelector((state: RootState) => state.user);
  const [menuList, setMenuList] = useState<MenuVO[]>(sortByKey(menu, "index"));
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

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
  const handleClickUp: React.MouseEventHandler<HTMLSpanElement> = ({ currentTarget: { id } }) => {
    handleClickArrow(id, true);
  };
  const handleClickDown: React.MouseEventHandler<HTMLSpanElement> = ({ currentTarget: { id } }) => {
    handleClickArrow(id, false);
  };

  const handleClickArrow = (id: string, isUp: boolean) => {
    let updateIndex = 0;
    const updateMenu: MenuVO[] = [];

    const menusToLoop = isUp ? menuList.reverse() : menuList;

    menusToLoop.forEach((menu) => {
      if (menu.id !== id) {
        if (updateIndex > 0 && menu.index === updateIndex) {
          updateMenu.push({ ...menu, index: isUp ? updateIndex + 1 : updateIndex - 1 });
        } else {
          updateMenu.push(menu);
        }
      } else {
        if (isUp) {
          updateIndex = menu.index - 1 <= 1 ? 1 : menu.index - 1;
        } else {
          updateIndex = menu.index + 1 >= menuList.length ? menuList.length : menu.index + 1;
        }
        updateMenu.push({ ...menu, index: updateIndex });
      }
    });

    const sortedMenu = sortByKey(updateMenu, "index");
    setMenuList(sortedMenu);
  };

  const handleClickAddMenu = () => {
    if (!inputRef.current) {
      return;
    }
    const lastIndex = menuList.reduce((acc, currentValue) => {
      return acc < currentValue.index ? currentValue.index : acc;
    }, 0);

    const newMenu: MenuVO = {
      count: 0,
      id: generateRandomString(32),
      name: inputRef.current.value,
      index: lastIndex + 1,
    };
    setMenuList([...menuList, newMenu]);
    inputRef.current.value = "";
  };

  const handleClickMenuReset = () => {
    const sortedMenu = sortByKey(menu, "index");
    setMenuList(sortedMenu);
  };
  const handleClickSaveMenus = async () => {
    const { data } = await requestApi({
      option: API_OPTIONS.editMenu,
      params: { menus: menuList, nickname: user.nickname },
    });

    if (data.status !== ApiStatus.OK) return;
    dispatch(setMenu(data.items));
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
  handleClickUp: React.MouseEventHandler<HTMLSpanElement>;
  handleClickDown: React.MouseEventHandler<HTMLSpanElement>;
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
        <span id={id} className="material-icons" onClick={handleClickUp}>
          keyboard_arrow_up
        </span>
        <span id={id} className="material-icons" onClick={handleClickDown}>
          keyboard_arrow_down
        </span>
      </div>
    </>
  );
};
