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
      <section className={styles.menu}>
        <ul>
          {menuList.map((menu, index) => {
            return (
              <li
                key={"memu_" + index}
                onClick={() => {
                  handleClickMenu(index);
                }}
                className={menu === currentMenu ? styles.currentMenu : ""}
              >
                {menu}
              </li>
            );
          })}
        </ul>
      </section>
      <hr />
      <div className={styles.content}>{cureentMenuComponent}</div>
    </div>
  );
};

export default ManagementCp;
