import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import BaseModal from "./BaseModal";

const ErrorModal = () => {
  const clientState = useSelector((state: RootState) => state.clientState);

  return (
    <BaseModal isOpen={clientState.error.isShowing} setIsOpen={() => {}}>
      <div className="error-wrap">
        <h3>{clientState.error.title}</h3>
        <hr />
        <div>{clientState.error.error}</div>
      </div>
    </BaseModal>
  );
};

export default ErrorModal;
