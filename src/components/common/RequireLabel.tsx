import React from "react";
import styles from "../../../styles/require.module.scss";

interface IRequireProps {
  isShowing?: boolean;
}

const RequireLabel = ({ isShowing = true }: IRequireProps) => {
  return <div className={isShowing ? styles.requireLabel : ""}></div>;
};

export default RequireLabel;
