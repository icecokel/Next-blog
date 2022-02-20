import React from "react";
import styles from "../../../styles/Header.module.scss";
import CategoryBar from "./CategoryBar";

const Header = () => {
  return (
    <>
      <header className={"wrap"}>
        <div>NickName</div>
        <div className={"logo"}>
          Eucalyptus<i className="material-icons">spa</i>
        </div>
        <div className={"search"}>
          <span>Search</span>
          <div>
            <i className="material-icons">search</i>
          </div>
        </div>
      </header>
      <CategoryBar></CategoryBar>
    </>
  );
};

export default Header;
