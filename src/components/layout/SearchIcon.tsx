import React, { useState } from "react";

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
    <div className="search-wrap">
      <input type="text" value={kerword} onChange={handleChange} />
      <i className="material-icons" onClick={handleClickSearch}>
        search
      </i>
    </div>
  );
};

export default React.memo(SearchIcon);
