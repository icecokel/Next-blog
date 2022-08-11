import React, { ReactElement } from "react";

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
    <div className="management-wrap">
      <div className="management-menu">
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
      <div className="management-content-wrap">
        <div className="management-content-title">
          <h2>{currentMenu}</h2>
        </div>
        <div className="management-content">{cureentMenuComponent}</div>
      </div>
    </div>
  );
};

export default ManagementCp;
