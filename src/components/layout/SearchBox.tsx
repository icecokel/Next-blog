import React from "react";

const SearchBox = () => {
  return (
    <div className={"search"}>
      <div>
        <i className="material-icons">search</i>
      </div>
    </div>
  );
};

export default React.memo(SearchBox);
