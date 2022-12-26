import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { CategoryVO } from "../../../store/modules/category";

const MenuIcon = () => {
  const category = useSelector((state: RootState) => state.category);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleToggle = ({ target: { tagName } }: any) => {
    if (tagName === "ARTICLE" || tagName === "I") {
      setOpenMenu(!openMenu);
    }
  };

  return (
    <>
      <div onClick={handleToggle}>
        <i className="material-icons">menu</i>
      </div>
    </>
  );
};

export default React.memo(MenuIcon);

interface IMenuContentsProps {
  category: CategoryVO[];
  handleClick: (e: any) => void;
}
