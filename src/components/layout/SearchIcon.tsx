import React, { useState } from "react";
import styles from "./SearchIcon.module.scss";

const SearchIcon = () => {
  const [kerword, setKeyword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };
  const handleClickSearch = () => {
    console.log(kerword);
  };
  return (
    <div className={styles.searchWrapper}>
      <input type="text" value={kerword} onChange={handleChange} />
      <i className="material-icons" onClick={handleClickSearch}>
        search
      </i>
    </div>
  );
};

export default React.memo(SearchIcon);
