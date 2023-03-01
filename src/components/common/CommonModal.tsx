import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setCommonModal } from "../../../store/modules/clientState";
import BaseModal from "./BaseModal";

const CommonModal = () => {
  const {
    modal: {
      common: { isShowing, text, title },
    },
  } = useSelector((state: RootState) => state.clientState);
  const dispatch = useDispatch();
  const handleClickClose = () => {
    dispatch(
      setCommonModal({
        isShowing: false,
        text,
        title,
      })
    );
  };

  return (
    <BaseModal title={title} isOpen={isShowing} setIsOpen={handleClickClose}>
      <div style={{ textAlign: "center" }}>{text}</div>
    </BaseModal>
  );
};

export default CommonModal;
