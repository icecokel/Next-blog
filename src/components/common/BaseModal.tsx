import React, { ReactNode } from "react";
import ReactModal from "react-modal";
import styles from "./BaseModal.module.scss";

const customStyles = {
  content: {
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "800px",
    minWidth: "300px",
    padding: "10px",
  },
  overlay: {
    background: "rgba(0,0,0,0.4)",
  },
};

interface IBaseModalProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Function;
}

const BaseModal = ({ title, children, isOpen, setIsOpen }: IBaseModalProps) => {
  return (
    <article>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        ariaHideApp={false}
        style={customStyles}
      >
        <div className={styles.title}>
          <h2>{title}</h2>
          <span className="material-icons" onClick={() => setIsOpen(false)}>
            highlight_off
          </span>
        </div>
        <hr />
        <>{children}</>
      </ReactModal>
    </article>
  );
};

export default BaseModal;
