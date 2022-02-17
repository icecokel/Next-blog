import React from "react";
import styles from "../../../styles/header.module.scss";

const CategoryBar = () => {
  const tempList: Array<any> = ["test1", "test2"];
  tempList.push("management");
  return (
    <div className={styles.category}>
      {tempList.map((item) => {
        return <span key={item}>{item}</span>;
      })}
    </div>
  );
};

export default CategoryBar;
