import React from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
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

const BaseModal = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: any;
  isOpen: boolean;
  setIsOpen: Function;
}) => {
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
        <div className="modal-close">
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
