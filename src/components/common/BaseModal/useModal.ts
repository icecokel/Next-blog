import { useContext } from "react";
import { IModalProps, ModalContext } from "./BaseModalProvider";

const useModal = (option: IModalProps) => {
  const { open, close } = useContext(ModalContext);

  const handleOpen = () => {
    open(option);
  };
  return {
    open: handleOpen,
    close,
  };
};

export default useModal;
