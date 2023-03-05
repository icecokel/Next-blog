import React, { ReactNode } from "react";
import styles from "./Loader.module.scss";

interface ILoaderProps {
  children: ReactNode;
  isLoading: boolean;
  size?: number;
}

const Loader = (props: ILoaderProps) => {
  return (
    <>
      {props.isLoading ? (
        <div className={styles.loader} style={{ fontSize: props.size ?? 20 }} />
      ) : (
        props.children
      )}
    </>
  );
};

export default Loader;
