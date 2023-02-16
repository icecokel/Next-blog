import React, { ReactElement } from "react";
import styles from "./ManagementCp.module.scss";

interface IProp {
  menuList: string[];
  currentMenu: string;
  handleClickMenu: (no: number) => void;
  currentMenuComponent: ReactElement;
}

const ManagementCp = ({
  menuList,
  currentMenu,
  handleClickMenu,
  currentMenuComponent: cureentMenuComponent,
}: IProp) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <ul>
          {menuList.map((menu, index) => {
            return (
              <li
                key={"memu_" + index}
                onClick={() => {
                  handleClickMenu(index);
                }}
                className={"mt-05 mb-05"}
              >
                {menu}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentTitle}>
          <h2>{currentMenu}</h2>
        </div>
        <div className={styles.content}>{cureentMenuComponent}</div>
      </div>
    </div>
  );
};

export default ManagementCp;
