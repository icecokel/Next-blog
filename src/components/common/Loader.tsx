import React, { ReactNode } from "react";
import styles from "../../../styles/loader.module.scss";

interface ILoaderProps {
  children: Element | ReactNode | React.ReactChildren;
  isLoading: boolean;
  size?: number;
}

const Loader = (props: ILoaderProps) => {
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
