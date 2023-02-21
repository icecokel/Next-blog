import React, { ReactNode } from "react";
import styles from "./Loader.module.scss";

interface ILoaderProps {
  children: Element | ReactNode | React.ReactChildren;
  isLoading: boolean;
  size?: number;
}

const Loader = (props: ILoaderProps) => {
  return (
    <>
      {props.isLoading ? (
        <i className={styles.loader} style={{ fontSize: props.size ?? 20 }}>
          Loading...
        </i>
      ) : (
        props.children
      )}
    </>
  );
};

export default Loader;
