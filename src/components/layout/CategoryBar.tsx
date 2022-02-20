import React from "react";

const CategoryBar = () => {
  const tempList: Array<any> = ["test1", "test2"];
  tempList.push("management");
  return (
    <div className="category">
      {tempList.map((item) => {
        return <span key={item}>{item}</span>;
      })}
    </div>
  );
};

export default CategoryBar;
