import React from "react";
import styles from "../../../styles/loader.module.scss";

const Loader = (props: {
  children: any;
  isLoading: boolean;
  size?: number;
}) => {
  return (
    <>
      {props.isLoading ? (
        <div className={styles.loader} style={{ fontSize: props.size ?? 20 }}>
          Loading...
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default Loader;
