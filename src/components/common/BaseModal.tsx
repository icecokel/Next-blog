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
  },
  overlay: {
    background: "rgba(0,0,0,0.4)",
  },
};

interface IBaseModalProps {
  children: Element | ReactNode | React.ReactChildren;
  isOpen: boolean;
  setIsOpen: Function;
}

const BaseModal = ({ children, isOpen, setIsOpen }: IBaseModalProps) => {
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        ariaHideApp={false}
        style={customStyles}
      >
        <div className={styles.close}>
          <i className="material-icons" onClick={() => setIsOpen(false)}>
            highlight_off
          </i>
        </div>
        <div>{children && children}</div>
      </ReactModal>
    </div>
  );
};

export default BaseModal;
