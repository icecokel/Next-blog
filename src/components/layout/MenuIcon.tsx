import React, { useState } from "react";
import SideBar from "./SideBar";

const MenuIcon = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleToggleOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div onClick={handleToggleOpen}>
        <span className="material-icons">menu</span>
      </div>
      {openMenu && <MenuIcon.content handleToggle={handleToggleOpen} />}
    </>
  );
};

export default React.memo(MenuIcon);

MenuIcon.content = SideBar;
