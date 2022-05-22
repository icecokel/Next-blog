import React from "react";
interface IRequireProps {
  isShowing?: boolean;
}

const RequireLabel = ({ isShowing = true }: IRequireProps) => {
  return <div className={isShowing ? "require-label" : ""}></div>;
};

export default RequireLabel;
